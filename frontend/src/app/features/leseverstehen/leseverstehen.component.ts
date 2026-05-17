import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AiService } from '../../core/services/ai.service';
import { LeseverstehenExercise } from '../../core/models/api.model';

type ExamType = 'goethe' | 'telc' | 'testdaf' | 'dsh';
type Step = 'pick' | 'loading' | 'read' | 'results';

@Component({
  selector: 'app-leseverstehen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leseverstehen.component.html',
})
export class LeseverstehenComponent {
  private aiService = inject(AiService);

  step: Step = 'pick';
  examType: ExamType = 'goethe';
  exercise: LeseverstehenExercise | null = null;
  userAnswers: Record<number, string> = {};
  textVisible = true;
  error = '';

  get answeredCount(): number {
    return Object.keys(this.userAnswers).length;
  }

  get totalQuestions(): number {
    return this.exercise?.fragen.length ?? 0;
  }

  get allAnswered(): boolean {
    return this.answeredCount === this.totalQuestions;
  }

  get correctCount(): number {
    if (!this.exercise) return 0;
    return this.exercise.fragen.filter(f => this.userAnswers[f.nr] === f.antwort).length;
  }

  get scorePercent(): number {
    if (!this.totalQuestions) return 0;
    return Math.round((this.correctCount / this.totalQuestions) * 100);
  }

  selectExam(type: ExamType) {
    this.examType = type;
    this.error = '';
    this.loadExercise();
  }

  loadExercise() {
    this.step = 'loading';
    this.userAnswers = {};
    this.exercise = null;
    this.aiService.getLeseverstehen(this.examType).subscribe({
      next: (res) => { this.exercise = res.data; this.textVisible = true; this.step = 'read'; },
      error: () => { this.error = 'Alıştırma oluşturulamadı, tekrar dene.'; this.step = 'pick'; },
    });
  }

  setAnswer(nr: number, val: string) {
    this.userAnswers = { ...this.userAnswers, [nr]: val };
  }

  submit() {
    if (!this.allAnswered) return;
    this.step = 'results';
  }

  restart() {
    this.step = 'pick';
    this.exercise = null;
    this.userAnswers = {};
    this.error = '';
  }

  rfnLabel(val: string): string {
    return { richtig: 'Richtig', falsch: 'Falsch', nicht_im_text: 'N. i. T.' }[val] ?? val;
  }

  rfnFullLabel(val: string): string {
    return { richtig: 'Richtig', falsch: 'Falsch', nicht_im_text: 'Nicht im Text' }[val] ?? val;
  }

  isCorrect(nr: number): boolean {
    return this.userAnswers[nr] === this.exercise?.fragen.find(f => f.nr === nr)?.antwort;
  }

  kontext(raw: string | undefined, luecke: string | undefined): { before: string; after: string } {
    if (!raw || !luecke) return { before: raw ?? '', after: '' };
    const parts = raw.split(`[${luecke}]`);
    return { before: parts[0] ?? '', after: parts[1] ?? '' };
  }

  grade(): { label: string; color: string } {
    const pct = this.scorePercent;
    if (this.examType === 'goethe') {
      if (pct >= 87) return { label: 'Sehr gut', color: 'bg-green-100 text-green-700' };
      if (pct >= 62) return { label: 'Gut', color: 'bg-yellow-100 text-yellow-700' };
      if (pct >= 37) return { label: 'Ausreichend', color: 'bg-orange-100 text-orange-700' };
      return { label: 'Nicht bestanden', color: 'bg-red-100 text-red-700' };
    }
    if (this.examType === 'telc') {
      if (pct >= 80) return { label: 'Sehr gut', color: 'bg-green-100 text-green-700' };
      if (pct >= 62) return { label: 'Gut (bestanden)', color: 'bg-yellow-100 text-yellow-700' };
      if (pct >= 45) return { label: 'Ausreichend', color: 'bg-orange-100 text-orange-700' };
      return { label: 'Nicht bestanden', color: 'bg-red-100 text-red-700' };
    }
    if (this.examType === 'testdaf') {
      if (pct >= 80) return { label: 'TDN 5', color: 'bg-green-100 text-green-700' };
      if (pct >= 63) return { label: 'TDN 4', color: 'bg-yellow-100 text-yellow-700' };
      if (pct >= 43) return { label: 'TDN 3', color: 'bg-orange-100 text-orange-700' };
      return { label: 'u. TDN 3', color: 'bg-red-100 text-red-700' };
    }
    if (pct >= 82) return { label: 'DSH-3', color: 'bg-green-100 text-green-700' };
    if (pct >= 67) return { label: 'DSH-2', color: 'bg-yellow-100 text-yellow-700' };
    if (pct >= 57) return { label: 'DSH-1', color: 'bg-orange-100 text-orange-700' };
    return { label: 'N. bestanden', color: 'bg-red-100 text-red-700' };
  }
}
