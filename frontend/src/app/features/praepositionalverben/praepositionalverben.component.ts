import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PraepositionalverbenService } from '../../core/services/praepositionalverben.service';
import { GapFillExercise, PraepositionalverbEntry } from '../../core/models/api.model';

type View = 'list' | 'exercise';

@Component({
  selector: 'app-praepositionalverben',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './praepositionalverben.component.html',
})
export class PraepositionalverbenComponent implements OnInit {
  private service = inject(PraepositionalverbenService);

  view: View = 'list';
  loading = false;

  // List view
  levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  selectedLevel = '';
  verbs: PraepositionalverbEntry[] = [];
  searchTerm = '';

  // Exercise view
  exercises: GapFillExercise[] = [];
  exerciseIndex = 0;
  selectedAnswer = '';
  answered = false;
  correctCount = 0;
  exercisePage = 1;
  totalPages = 1;
  exerciseLevel = '';

  get currentExercise(): GapFillExercise | null {
    return this.exercises[this.exerciseIndex] ?? null;
  }

  get filteredVerbs(): PraepositionalverbEntry[] {
    if (!this.searchTerm.trim()) return this.verbs;
    const q = this.searchTerm.toLowerCase();
    return this.verbs.filter(
      (v) =>
        v.verb.toLowerCase().includes(q) ||
        v.preposition.includes(q) ||
        v.meaning_tr.toLowerCase().includes(q)
    );
  }

  get progress(): number {
    if (!this.exercises.length) return 0;
    return Math.round(((this.exerciseIndex + 1) / this.exercises.length) * 100);
  }

  ngOnInit() {
    this.loadList();
  }

  loadList() {
    this.loading = true;
    this.service.getAll(this.selectedLevel || undefined).subscribe({
      next: (res) => { this.verbs = res.data; this.loading = false; },
      error: () => { this.loading = false; },
    });
  }

  startExercises() {
    this.loading = true;
    this.exercisePage = 1;
    this.loadExercisePage();
  }

  loadExercisePage() {
    this.service.getExercises(this.exerciseLevel || undefined, this.exercisePage).subscribe({
      next: (res) => {
        this.exercises = res.data;
        this.totalPages = res.pages;
        this.exerciseIndex = 0;
        this.selectedAnswer = '';
        this.answered = false;
        this.correctCount = 0;
        this.view = 'exercise';
        this.loading = false;
      },
      error: () => { this.loading = false; },
    });
  }

  selectAnswer(option: string) {
    if (this.answered) return;
    this.selectedAnswer = option;
    this.answered = true;
    if (option === this.currentExercise?.answer) this.correctCount++;
  }

  next() {
    if (this.exerciseIndex < this.exercises.length - 1) {
      this.exerciseIndex++;
      this.selectedAnswer = '';
      this.answered = false;
    }
  }

  prevPage() {
    if (this.exercisePage > 1) {
      this.exercisePage--;
      this.loading = true;
      this.loadExercisePage();
    }
  }

  nextPage() {
    if (this.exercisePage < this.totalPages) {
      this.exercisePage++;
      this.loading = true;
      this.loadExercisePage();
    }
  }

  backToList() {
    this.view = 'list';
    this.loadList();
  }

  isLastExercise(): boolean {
    return this.exerciseIndex === this.exercises.length - 1;
  }

  optionClass(option: string): string {
    if (!this.answered) return 'bg-white border-slate-200 text-slate-700';
    if (option === this.currentExercise?.answer) return 'bg-green-500 border-green-500 text-white';
    if (option === this.selectedAnswer) return 'bg-red-400 border-red-400 text-white';
    return 'bg-white border-slate-200 text-slate-400';
  }

  caseColor(c: string): string {
    return c === 'Akkusativ' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700';
  }
}
