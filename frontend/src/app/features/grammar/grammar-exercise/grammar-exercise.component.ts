import { Component, Input, signal, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrammarExercise } from '../../../core/models/grammar.model';

@Component({
  selector: 'app-grammar-exercise',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grammar-exercise.component.html',
})
export class GrammarExerciseComponent implements OnChanges {
  @Input() exercises: GrammarExercise[] = [];

  currentIndex = signal(0);
  selectedAnswer = signal<string | null>(null);
  showFeedback = signal(false);
  score = signal(0);
  done = signal(false);

  ngOnChanges() {
    this.restart();
  }

  get current(): GrammarExercise {
    return this.exercises[this.currentIndex()];
  }

  get total(): number {
    return this.exercises.length;
  }

  get isCorrect(): boolean {
    return this.selectedAnswer() === this.current?.answer;
  }

  get isFillInBlank(): boolean {
    return this.current?.question.includes('___');
  }

  get questionParts(): string[] {
    return this.current?.question.split('___') ?? [];
  }

  get progressPercent(): number {
    return ((this.currentIndex() + 1) / this.total) * 100;
  }

  get scoreEmoji(): string {
    const ratio = this.score() / this.total;
    if (ratio >= 0.9) return '🏆';
    if (ratio >= 0.7) return '⭐';
    if (ratio >= 0.5) return '👍';
    return '📚';
  }

  private scrollCardBottomAboveNav(): void {
    setTimeout(() => {
      const el = document.getElementById('exercise-card');
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const navHeight = 64 + 16;
      const overflow = rect.bottom - (window.innerHeight - navHeight);
      if (overflow > 0) {
        window.scrollBy({ top: overflow, behavior: 'smooth' });
      }
    }, 200);
  }

  select(option: string): void {
    if (this.showFeedback()) return;
    this.selectedAnswer.set(option);
    this.showFeedback.set(true);
    if (option === this.current.answer) {
      this.score.update(s => s + 1);
    }
    this.scrollCardBottomAboveNav();
  }

  next(): void {
    if (this.currentIndex() < this.total - 1) {
      this.currentIndex.update(i => i + 1);
      this.selectedAnswer.set(null);
      this.showFeedback.set(false);
    } else {
      this.done.set(true);
    }
    setTimeout(() => {
      document.getElementById('exercise-card')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }

  restart(): void {
    this.currentIndex.set(0);
    this.selectedAnswer.set(null);
    this.showFeedback.set(false);
    this.score.set(0);
    this.done.set(false);
  }

  optionClass(option: string): string {
    if (!this.showFeedback()) {
      return 'border-slate-200 text-slate-700 hover:border-primary-400 hover:bg-primary-50';
    }
    if (option === this.current.answer) {
      return 'border-green-500 bg-green-50 text-green-800 font-semibold';
    }
    if (option === this.selectedAnswer()) {
      return 'border-red-400 bg-red-50 text-red-700';
    }
    return 'border-slate-200 text-slate-400';
  }
}
