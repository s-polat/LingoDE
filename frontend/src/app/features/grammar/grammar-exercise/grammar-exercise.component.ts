import { Component, Input, signal, OnChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrammarExercise } from '../../../core/models/grammar.model';
import { SessionService } from '../../../core/services/session.service';

@Component({
  selector: 'app-grammar-exercise',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grammar-exercise.component.html',
})
export class GrammarExerciseComponent implements OnChanges {
  @Input() exercises: GrammarExercise[] = [];
  @Input() topic = '';

  private sessionService = inject(SessionService);

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

  private getScrollContainer(): HTMLElement | null {
    return document.querySelector('main');
  }

  select(option: string): void {
    if (this.showFeedback()) return;
    this.selectedAnswer.set(option);
    this.showFeedback.set(true);
    if (option === this.current.answer) {
      this.score.update(s => s + 1);
    }
    setTimeout(() => {
      const main = this.getScrollContainer();
      if (main) main.scrollTo({ top: main.scrollHeight, behavior: 'smooth' });
    }, 100);
  }

  next(): void {
    if (this.currentIndex() < this.total - 1) {
      this.currentIndex.update(i => i + 1);
      this.selectedAnswer.set(null);
      this.showFeedback.set(false);
    } else {
      this.done.set(true);
      this.sessionService.save({
        type: 'grammar',
        subtype: this.topic,
        score: Math.round((this.score() / this.total) * 100),
        rawScore: this.score(),
        maxScore: this.total,
      });
    }
    setTimeout(() => {
      const main = this.getScrollContainer();
      const el = document.getElementById('exercise-card');
      if (main && el) main.scrollTo({ top: el.offsetTop - 16, behavior: 'smooth' });
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
