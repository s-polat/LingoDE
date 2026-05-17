import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AiService } from '../../core/services/ai.service';
import { HochschuleFeedback } from '../../core/models/api.model';

type ExamType = 'testdaf' | 'dsh';
type Step = 'pick' | 'loading' | 'write' | 'analyzing' | 'feedback';

@Component({
  selector: 'app-hochschulschreibtrainer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hochschulschreibtrainer.component.html',
})
export class HochschulschreibtrainerComponent {
  private aiService = inject(AiService);

  step: Step = 'pick';
  examType: ExamType = 'testdaf';
  prompt = '';
  topic = '';
  text = '';
  error = '';
  feedback: HochschuleFeedback | null = null;

  readonly minWords = 250;
  readonly maxWords = 350;

  get wordCount(): number {
    return this.text.trim() ? this.text.trim().split(/\s+/).length : 0;
  }

  get wordCountColor(): string {
    if (this.wordCount < this.minWords) return 'text-red-500';
    if (this.wordCount > this.maxWords) return 'text-orange-500';
    return 'text-green-600';
  }

  get canSubmit(): boolean {
    return this.wordCount >= this.minWords;
  }

  get scorePercent(): number {
    if (!this.feedback) return 0;
    return Math.round((this.feedback.gesamtpunkte / this.feedback.maxpunkte) * 100);
  }

  selectType(type: ExamType) {
    this.examType = type;
    this.text = '';
    this.error = '';
    this.loadPrompt();
  }

  loadPrompt() {
    this.step = 'loading';
    this.aiService.generateHochschulePrompt(this.examType).subscribe({
      next: (res) => {
        this.prompt = res.data.prompt;
        this.topic = res.data.topic;
        this.step = 'write';
      },
      error: () => {
        this.error = 'Görev oluşturulamadı, tekrar dene.';
        this.step = 'pick';
      },
    });
  }

  newPrompt() {
    this.text = '';
    this.loadPrompt();
  }

  submit() {
    if (!this.canSubmit) return;
    this.step = 'analyzing';
    this.error = '';
    this.aiService.analyzeHochschuleWriting(this.examType, this.prompt, this.text).subscribe({
      next: (res) => { this.feedback = res.data; this.step = 'feedback'; },
      error: () => { this.error = 'Analiz başarısız, tekrar dene.'; this.step = 'write'; },
    });
  }

  restart() {
    this.step = 'pick';
    this.text = '';
    this.feedback = null;
    this.error = '';
  }

  tryAgain() {
    this.step = 'write';
    this.feedback = null;
  }

  noteColor(note: string): string {
    if (note === 'TDN 5' || note === 'DSH-3') return 'bg-green-100 text-green-700';
    if (note === 'TDN 4' || note === 'DSH-2') return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  }

  scoreBar(punkte: number, max: number): number {
    return Math.round((punkte / max) * 100);
  }

  scoreColor(punkte: number, max: number): string {
    const pct = (punkte / max) * 100;
    if (pct >= 75) return 'text-green-600';
    if (pct >= 55) return 'text-yellow-600';
    return 'text-red-500';
  }

  readonly testdafLabels: Record<string, string> = {
    inhalt: 'Inhalt',
    kommunikativeGestaltung: 'Komm. Gestaltung',
    sprachlicheMittel: 'Sprachliche Mittel',
  };

  readonly dshLabels: Record<string, string> = {
    gesamteindruck: 'Gesamteindruck',
    aufgabenbearbeitung: 'Aufgabenbearbeitung',
    sprachlicheRealisierung: 'Sprachl. Realisierung',
  };

  get kategorienEntries() {
    if (!this.feedback) return [];
    const labels = this.feedback.pruefung === 'TestDaF' ? this.testdafLabels : this.dshLabels;
    return Object.entries(this.feedback.kategorien).map(([key, val]) => ({
      key,
      label: labels[key] ?? key,
      ...val,
    }));
  }
}
