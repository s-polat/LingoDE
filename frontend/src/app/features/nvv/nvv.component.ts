import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NvvService } from '../../core/services/nvv.service';
import { NvvEntry, NvvExercise } from '../../core/models/nvv.model';

type View = 'list' | 'exercise';

const CATEGORIES = ['Handlung', 'Kommunikation', 'Bewertung', 'Zustand', 'Emotion', 'Wirtschaft', 'Wissen'];

const CATEGORY_LABELS: Record<string, string> = {
  Handlung: 'Eylem',
  Kommunikation: 'İletişim',
  Bewertung: 'Değerlendirme',
  Zustand: 'Durum/Süreç',
  Emotion: 'Duygu',
  Wirtschaft: 'İş/Ekonomi',
  Wissen: 'Bilgi',
};

@Component({
  selector: 'app-nvv',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nvv.component.html',
})
export class NvvComponent implements OnInit {
  private service = inject(NvvService);

  view: View = 'list';
  loading = false;

  categories = CATEGORIES;
  categoryLabels = CATEGORY_LABELS;
  selectedCategory = '';
  searchTerm = '';
  entries: NvvEntry[] = [];

  exercises: NvvExercise[] = [];
  exerciseIndex = 0;
  selectedAnswer = '';
  answered = false;
  correctCount = 0;
  exercisePage = 1;
  totalPages = 1;
  exerciseCategory = '';

  get currentExercise(): NvvExercise | null {
    return this.exercises[this.exerciseIndex] ?? null;
  }

  get filteredEntries(): NvvEntry[] {
    if (!this.searchTerm.trim()) return this.entries;
    const q = this.searchTerm.toLowerCase();
    return this.entries.filter(
      (e) =>
        e.phrase.toLowerCase().includes(q) ||
        e.meaning_tr.toLowerCase().includes(q) ||
        e.equivalent_verb.toLowerCase().includes(q)
    );
  }

  get groupedEntries(): Record<string, NvvEntry[]> {
    const groups: Record<string, NvvEntry[]> = {};
    for (const e of this.filteredEntries) {
      if (!groups[e.category]) groups[e.category] = [];
      groups[e.category].push(e);
    }
    return groups;
  }

  get activeCategories(): string[] {
    return this.categories.filter((c) => this.groupedEntries[c]?.length);
  }

  get progress(): number {
    if (!this.exercises.length) return 0;
    return Math.round(((this.exerciseIndex + 1) / this.exercises.length) * 100);
  }

  get sentenceParts(): string[] {
    return this.currentExercise?.sentence_with_gap.split('___') ?? [];
  }

  ngOnInit() {
    this.loadList();
  }

  loadList() {
    this.loading = true;
    this.service.getAll(this.selectedCategory || undefined).subscribe({
      next: (res) => { this.entries = res.data; this.loading = false; },
      error: () => { this.loading = false; },
    });
  }

  startExercises() {
    this.loading = true;
    this.exercisePage = 1;
    this.loadExercisePage();
  }

  loadExercisePage() {
    this.service.getExercises(this.exerciseCategory || undefined, this.exercisePage).subscribe({
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
    setTimeout(() => {
      const main = document.querySelector('main');
      if (main) main.scrollTo({ top: main.scrollHeight, behavior: 'smooth' });
    }, 100);
  }

  next() {
    if (this.exerciseIndex < this.exercises.length - 1) {
      this.exerciseIndex++;
      this.selectedAnswer = '';
      this.answered = false;
      setTimeout(() => {
        const main = document.querySelector('main');
        const el = document.getElementById('nvv-exercise-card');
        if (main && el) main.scrollTo({ top: el.offsetTop - 16, behavior: 'smooth' });
      }, 50);
    }
  }

  prevPage() {
    if (this.exercisePage > 1) { this.exercisePage--; this.loading = true; this.loadExercisePage(); }
  }

  nextPage() {
    if (this.exercisePage < this.totalPages) { this.exercisePage++; this.loading = true; this.loadExercisePage(); }
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

  categoryColor(cat: string): string {
    const colors: Record<string, string> = {
      Handlung: 'bg-blue-100 text-blue-700',
      Kommunikation: 'bg-purple-100 text-purple-700',
      Bewertung: 'bg-amber-100 text-amber-700',
      Zustand: 'bg-teal-100 text-teal-700',
      Emotion: 'bg-pink-100 text-pink-700',
      Wirtschaft: 'bg-green-100 text-green-700',
      Wissen: 'bg-orange-100 text-orange-700',
    };
    return colors[cat] ?? 'bg-slate-100 text-slate-600';
  }
}
