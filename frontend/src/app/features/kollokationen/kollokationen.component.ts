import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Kollokation, KOLLOKATIONEN_DATA, KATEGORIEN, shuffleOptions,
} from './kollokationen.data';

type Step = 'pick' | 'exercise' | 'results';

@Component({
  selector: 'app-kollokationen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kollokationen.component.html',
})
export class KollokationenComponent {
  step: Step = 'pick';
  selectedKategorie = 'Alle';
  queue: Kollokation[] = [];
  currentIndex = 0;

  mcOptions: string[] = [];
  selectedOption: string | null = null;
  answered = false;
  answers = new Map<number, string>();

  private historyMap = new Map<number, { selectedOption: string | null; mcOptions: string[] }>();

  readonly kategorien = KATEGORIEN;

  get currentItem(): Kollokation  { return this.queue[this.currentIndex]; }
  get totalItems(): number        { return this.queue.length; }
  get currentNr(): number         { return this.currentIndex + 1; }
  get progress(): number          { return Math.round((this.currentIndex / this.totalItems) * 100); }
  get isCorrect(): boolean        { return this.selectedOption === this.currentItem.optionen[0]; }

  get correctCount(): number {
    return this.queue.filter(item => this.answers.get(item.id) === item.optionen[0]).length;
  }
  get score(): number {
    return this.totalItems > 0 ? Math.round((this.correctCount / this.totalItems) * 100) : 0;
  }
  get wrongItems(): Kollokation[] {
    return this.queue.filter(item => this.answers.get(item.id) !== item.optionen[0]);
  }

  selectKategorie(k: string) { this.selectedKategorie = k; }

  start() {
    const pool = this.selectedKategorie === 'Alle'
      ? KOLLOKATIONEN_DATA
      : KOLLOKATIONEN_DATA.filter(k => k.kategorie === this.selectedKategorie);
    this.queue        = [...pool].sort(() => Math.random() - 0.5);
    this.currentIndex = 0;
    this.answers.clear();
    this.historyMap.clear();
    this.resetQuestion();
    this.step = 'exercise';
  }

  private resetQuestion() {
    this.selectedOption = null;
    this.answered       = false;
    this.mcOptions      = shuffleOptions([...this.currentItem.optionen]);
  }

  private restoreOrReset() {
    const saved = this.historyMap.get(this.currentIndex);
    if (saved) {
      this.selectedOption = saved.selectedOption;
      this.mcOptions      = saved.mcOptions;
      this.answered       = true;
    } else {
      this.resetQuestion();
    }
  }

  selectOption(opt: string) {
    if (this.answered) return;
    this.selectedOption = opt;
    this.answered       = true;
    this.answers.set(this.currentItem.id, opt);
    this.historyMap.set(this.currentIndex, { selectedOption: opt, mcOptions: [...this.mcOptions] });
  }

  optionClass(opt: string): string {
    if (!this.answered) return 'border-slate-200 text-slate-700 hover:border-teal-300 bg-white';
    if (opt === this.currentItem.optionen[0]) return 'border-green-400 bg-green-50 text-green-800 font-semibold';
    if (opt === this.selectedOption)          return 'border-red-400 bg-red-50 text-red-700';
    return 'border-slate-100 text-slate-400 bg-slate-50';
  }

  prev() {
    if (this.currentIndex === 0) return;
    this.currentIndex--;
    this.restoreOrReset();
  }

  next() {
    if (this.currentIndex < this.totalItems - 1) {
      this.currentIndex++;
      this.restoreOrReset();
    } else {
      this.step = 'results';
    }
  }

  renderedSatz(): string {
    return this.currentItem.satz.replace('___',
      `<span style="display:inline-block;min-width:60px;border-bottom:2px solid #0d9488;font-weight:700;color:#0d9488;text-align:center;">___</span>`
    );
  }

  restart() { this.step = 'pick'; }
  retry()   { this.start(); }
}
