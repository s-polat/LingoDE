import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpErrorResponse } from '@angular/common/http';
import {
  SprachbausteineText, SprachbausteineItem,
  SPRACHBAUSTEINE_TEXTE, shuffleOptions,
} from './sprachbausteine.data';
import { NvvService } from '../../core/services/nvv.service';
import { PraepositionalverbenService } from '../../core/services/praepositionalverben.service';

type Step      = 'pick' | 'exercise' | 'results';
type SaveState = 'idle' | 'saving' | 'saved' | 'exists' | 'error';

@Component({
  selector: 'app-sprachbausteine',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sprachbausteine.component.html',
})
export class SprachbausteineComponent {
  private sanitizer = inject(DomSanitizer);
  private nvvSvc    = inject(NvvService);
  private pvSvc     = inject(PraepositionalverbenService);

  step: Step = 'pick';
  selectedText: SprachbausteineText | null = null;
  currentNr = 1;

  mcOptions: string[] = [];
  selectedOption: string | null = null;
  answered = false;

  saveState: SaveState = 'idle';

  answers = new Map<number, string>();
  private historyMap = new Map<number, { selectedOption: string | null; mcOptions: string[] }>();

  readonly texte = SPRACHBAUSTEINE_TEXTE;

  get currentText(): SprachbausteineText { return this.selectedText!; }
  get currentItem(): SprachbausteineItem {
    return this.currentText.items.find(i => i.nr === this.currentNr)!;
  }
  get totalItems(): number { return this.currentText.items.length; }
  get progress(): number {
    return Math.round(((this.currentNr - 1) / this.totalItems) * 100);
  }
  get isCorrect(): boolean {
    return this.selectedOption === this.currentItem.optionen[0];
  }

  get correctCount(): number {
    return this.currentText.items.filter(item =>
      this.answers.get(item.nr) === item.optionen[0]
    ).length;
  }
  get score(): number {
    return this.totalItems > 0
      ? Math.round((this.correctCount / this.totalItems) * 100)
      : 0;
  }
  get wrongItems(): SprachbausteineItem[] {
    return this.currentText.items.filter(
      item => this.answers.get(item.nr) !== item.optionen[0]
    );
  }
  get hasWrong(): boolean { return this.wrongItems.length > 0; }

  get renderedText(): SafeHtml {
    if (!this.selectedText) return this.sanitizer.bypassSecurityTrustHtml('');
    const html = this.currentText.text.replace(/\[(\d+)\]/g, (_, nr) => {
      const n = parseInt(nr);
      const style = this.gapInlineStyle(n);
      return `<span style="${style}">&thinsp;${nr}&thinsp;</span>`;
    });
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  private gapInlineStyle(nr: number): string {
    const base =
      'display:inline-flex;align-items:center;justify-content:center;' +
      'min-width:22px;height:22px;border-radius:5px;' +
      'font-size:11px;font-weight:700;margin:0 2px;vertical-align:middle;';
    if (nr === this.currentNr && !this.answered) {
      return base + 'background:#6366f1;color:#fff;box-shadow:0 0 0 2px #a5b4fc;';
    }
    const ans = this.answers.get(nr);
    if (!ans) return base + 'background:#f1f5f9;color:#94a3b8;';
    const item = this.currentText.items.find(i => i.nr === nr)!;
    return ans === item.optionen[0]
      ? base + 'background:#bbf7d0;color:#166534;'
      : base + 'background:#fecaca;color:#991b1b;';
  }

  start(text: SprachbausteineText) {
    this.selectedText = text;
    this.currentNr    = 1;
    this.answers.clear();
    this.historyMap.clear();
    this.resetQuestion();
    this.step = 'exercise';
  }

  private resetQuestion() {
    this.selectedOption = null;
    this.answered       = false;
    this.saveState      = 'idle';
    this.mcOptions      = shuffleOptions([...this.currentItem.optionen]);
  }

  private restoreOrReset() {
    const saved = this.historyMap.get(this.currentNr);
    if (saved) {
      this.selectedOption = saved.selectedOption;
      this.mcOptions      = saved.mcOptions;
      this.answered       = true;
      this.saveState      = 'idle';
    } else {
      this.resetQuestion();
    }
  }

  selectOption(opt: string) {
    if (this.answered) return;
    this.selectedOption = opt;
    this.answered       = true;
    this.answers.set(this.currentNr, opt);
    this.historyMap.set(this.currentNr, { selectedOption: opt, mcOptions: [...this.mcOptions] });
  }

  optionClass(opt: string): string {
    if (!this.answered) return 'border-slate-200 text-slate-700 hover:border-indigo-300 bg-white';
    if (opt === this.currentItem.optionen[0]) return 'border-green-400 bg-green-50 text-green-800 font-semibold';
    if (opt === this.selectedOption) return 'border-red-400 bg-red-50 text-red-700';
    return 'border-slate-100 text-slate-400 bg-slate-50';
  }

  saveKalip() {
    const kalip = this.currentItem.kalip;
    if (!kalip || this.saveState === 'saving' || this.saveState === 'saved') return;

    this.saveState = 'saving';

    if (kalip.type === 'nvv') {
      const { type, ...entry } = kalip;
      this.nvvSvc.save(entry as any).subscribe({
        next: ()  => { this.saveState = 'saved'; },
        error: (e: HttpErrorResponse) => {
          this.saveState = e.status === 409 ? 'exists' : 'error';
        },
      });
    } else {
      const { type, ...entry } = kalip;
      this.pvSvc.save(entry as any).subscribe({
        next: ()  => { this.saveState = 'saved'; },
        error: (e: HttpErrorResponse) => {
          this.saveState = e.status === 409 ? 'exists' : 'error';
        },
      });
    }
  }

  prev() {
    if (this.currentNr <= 1) return;
    this.currentNr--;
    this.restoreOrReset();
  }

  next() {
    if (this.currentNr < this.totalItems) {
      this.currentNr++;
      this.restoreOrReset();
    } else {
      this.step = 'results';
    }
  }

  retry()   { this.start(this.currentText); }
  restart() { this.step = 'pick'; this.selectedText = null; }
}
