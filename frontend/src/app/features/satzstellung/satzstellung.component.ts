import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SatzstellungExercise, SatzTyp, SATZSTELLUNG_DATA, ALLE_TYPEN, TYP_LABELS,
} from './satzstellung.data';

type Step = 'pick' | 'exercise' | 'results';

@Component({
  selector: 'app-satzstellung',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './satzstellung.component.html',
})
export class SatzstellungComponent {
  step: Step = 'pick';
  selectedTyp: SatzTyp | 'alle' = 'alle';

  queue: SatzstellungExercise[] = [];
  currentIndex = 0;

  available: string[] = [];  // kalan kelimeler
  built: string[]     = [];  // kullanıcının oluşturduğu cümle
  answered = false;
  isCorrect = false;

  wrongItems: SatzstellungExercise[] = [];

  readonly alleTypen  = ALLE_TYPEN;
  readonly typLabels  = TYP_LABELS;

  get currentItem(): SatzstellungExercise { return this.queue[this.currentIndex]; }
  get totalItems(): number                { return this.queue.length; }
  get currentNr(): number                 { return this.currentIndex + 1; }
  get progress(): number                  { return Math.round((this.currentIndex / this.totalItems) * 100); }
  get correctCount(): number              { return this.totalItems - this.wrongItems.length; }
  get score(): number                     { return Math.round((this.correctCount / this.totalItems) * 100); }

  typLabel(typ: SatzTyp | 'alle'): string {
    return typ === 'alle' ? 'Alle Typen' : this.typLabels[typ];
  }

  countForTyp(typ: SatzTyp): number {
    return SATZSTELLUNG_DATA.filter(e => e.typ === typ).length;
  }

  start() {
    const pool = this.selectedTyp === 'alle'
      ? SATZSTELLUNG_DATA
      : SATZSTELLUNG_DATA.filter(e => e.typ === this.selectedTyp);
    this.queue        = [...pool].sort(() => Math.random() - 0.5);
    this.currentIndex = 0;
    this.wrongItems   = [];
    this.loadQuestion();
    this.step = 'exercise';
  }

  private loadQuestion() {
    this.available = [...this.currentItem.woerter].sort(() => Math.random() - 0.5);
    this.built     = [];
    this.answered  = false;
    this.isCorrect = false;
  }

  placeWord(word: string, idx: number) {
    if (this.answered) return;
    this.available.splice(idx, 1);
    this.built.push(word);
  }

  removeWord(word: string, idx: number) {
    if (this.answered) return;
    this.built.splice(idx, 1);
    this.available.push(word);
  }

  check() {
    if (this.built.length === 0) return;
    const normalize = (s: string) =>
      s.toLowerCase().replace(/[.,!?;:]/g, '').replace(/\s+/g, ' ').trim();
    this.isCorrect = normalize(this.built.join(' ')) === normalize(this.currentItem.loesung);
    this.answered  = true;
    if (!this.isCorrect) this.wrongItems.push(this.currentItem);
  }

  next() {
    if (this.currentIndex < this.totalItems - 1) {
      this.currentIndex++;
      this.loadQuestion();
    } else {
      this.step = 'results';
    }
  }

  restart() { this.step = 'pick'; }
  retry()   { this.start(); }
}
