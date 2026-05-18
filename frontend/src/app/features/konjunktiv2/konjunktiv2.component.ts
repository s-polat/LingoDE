import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  K2Exercise, K2Kategorie,
  K2_DATA, K2_KATEGORIEN_LISTE,
  shuffleK2, shuffleStrings,
} from './konjunktiv2.data';

type Step = 'pick' | 'exercise' | 'results';

@Component({
  selector: 'app-konjunktiv2',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './konjunktiv2.component.html',
})
export class Konjunktiv2Component {
  step: Step = 'pick';
  selectedKategorie = 'Alle';

  queue: K2Exercise[] = [];
  currentIndex = 0;

  userInput = '';
  revealed = false;

  mcOptions: string[] = [];
  selectedOption: string | null = null;
  answered = false;

  bekannt: number[] = [];
  wiederholen: number[] = [];

  readonly kategorienListe = [
    { name: 'Alle', emoji: '📚', formel: 'Tüm yapılar', count: K2_DATA.length },
    ...K2_KATEGORIEN_LISTE,
  ];

  get current(): K2Exercise { return this.queue[this.currentIndex]; }
  get progress(): number { return Math.round((this.currentIndex / this.queue.length) * 100); }
  get hasWeak(): boolean { return this.wiederholen.length > 0; }
  get isUmformung(): boolean { return this.current?.typ === 'umformung'; }
  get isLuecke(): boolean { return this.current?.typ === 'luecke'; }
  get isCorrectOption(): boolean { return this.selectedOption === this.current?.optionen?.[0]; }

  start(kategorie: string) {
    this.selectedKategorie = kategorie;
    const filtered = kategorie === 'Alle'
      ? [...K2_DATA]
      : K2_DATA.filter(e => e.kategorie === kategorie);
    this.queue = shuffleK2(filtered);
    this.currentIndex = 0;
    this.bekannt = [];
    this.wiederholen = [];
    this.resetExercise();
    this.step = 'exercise';
  }

  private resetExercise() {
    this.userInput = '';
    this.revealed = false;
    this.selectedOption = null;
    this.answered = false;
    if (this.queue[this.currentIndex]?.typ === 'luecke') {
      this.mcOptions = shuffleStrings([...(this.current.optionen ?? [])]);
    }
  }

  reveal() { this.revealed = true; }

  selfRate(correct: boolean) {
    if (correct) this.bekannt.push(this.current.id);
    else this.wiederholen.push(this.current.id);
    this.advance();
  }

  selectOption(opt: string) {
    if (this.answered) return;
    this.selectedOption = opt;
    this.answered = true;
    if (this.isCorrectOption) this.bekannt.push(this.current.id);
    else this.wiederholen.push(this.current.id);
  }

  optionClass(opt: string): string {
    if (!this.answered) return 'border-slate-200 text-slate-700 hover:border-indigo-300 bg-white';
    if (opt === this.current.optionen?.[0]) return 'border-green-400 bg-green-50 text-green-800 font-semibold';
    if (opt === this.selectedOption) return 'border-red-400 bg-red-50 text-red-700';
    return 'border-slate-100 text-slate-400 bg-slate-50';
  }

  next() { this.advance(); }

  private advance() {
    if (this.currentIndex < this.queue.length - 1) {
      this.currentIndex++;
      this.resetExercise();
    } else {
      this.step = 'results';
    }
  }

  retryWeak() {
    const ids = new Set(this.wiederholen);
    this.queue = shuffleK2(K2_DATA.filter(e => ids.has(e.id)));
    this.currentIndex = 0;
    this.bekannt = [];
    this.wiederholen = [];
    this.resetExercise();
    this.step = 'exercise';
  }

  restart() { this.step = 'pick'; }

  get weakExercises(): K2Exercise[] {
    const ids = new Set(this.wiederholen);
    return K2_DATA.filter(e => ids.has(e.id));
  }

  get score(): number {
    return this.queue.length > 0
      ? Math.round((this.bekannt.length / this.queue.length) * 100)
      : 0;
  }
}
