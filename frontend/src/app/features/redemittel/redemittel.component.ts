import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Redemittel, REDEMITTEL_DATA, REDEMITTEL_KATEGORIEN, shuffle } from './redemittel.data';

type Step = 'pick' | 'learn' | 'quiz' | 'results';
type Mode = 'learn' | 'quiz';

interface QuizOption { text: string; correct: boolean; }

@Component({
  selector: 'app-redemittel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './redemittel.component.html',
})
export class RedemittelComponent {
  step: Step = 'pick';
  mode: Mode = 'quiz';
  selectedKategorie = 'Alle';

  queue: Redemittel[] = [];
  currentIndex = 0;
  flipped = false;

  quizOptions: QuizOption[] = [];
  selectedOption: string | null = null;
  answered = false;

  bekannt: number[] = [];
  wiederholen: number[] = [];

  get current(): Redemittel { return this.queue[this.currentIndex]; }
  get progress(): number { return Math.round((this.currentIndex / this.queue.length) * 100); }
  get hasWeak(): boolean { return this.wiederholen.length > 0; }

  get kategorienListe() {
    return [
      { name: 'Alle', emoji: '📚', count: REDEMITTEL_DATA.length },
      ...REDEMITTEL_KATEGORIEN.map(k => ({
        ...k,
        count: REDEMITTEL_DATA.filter(r => r.kategorie === k.name).length,
      })),
    ];
  }

  setMode(m: Mode) { this.mode = m; }

  start(kategorie: string) {
    this.selectedKategorie = kategorie;
    const filtered = kategorie === 'Alle'
      ? [...REDEMITTEL_DATA]
      : REDEMITTEL_DATA.filter(r => r.kategorie === kategorie);
    this.queue = shuffle(filtered);
    this.currentIndex = 0;
    this.bekannt = [];
    this.wiederholen = [];

    if (this.mode === 'quiz') {
      this.prepareQuiz();
      this.step = 'quiz';
    } else {
      this.flipped = false;
      this.step = 'learn';
    }
  }

  // ── LEARN (kart) ──────────────────────────────────
  flip() { this.flipped = true; }

  learnAnswer(known: boolean) {
    if (known) this.bekannt.push(this.current.id);
    else this.wiederholen.push(this.current.id);
    this.advance('learn');
  }

  // ── QUIZ (çoktan seçmeli) ──────────────────────────
  private prepareQuiz() {
    this.quizOptions = this.buildOptions(this.current);
    this.selectedOption = null;
    this.answered = false;
  }

  private buildOptions(card: Redemittel): QuizOption[] {
    const correct = card.ausdrucke[0];
    const sameCat = REDEMITTEL_DATA.filter(r => r.id !== card.id && r.kategorie === card.kategorie);
    const otherCat = REDEMITTEL_DATA.filter(r => r.id !== card.id && r.kategorie !== card.kategorie);
    const distractors = shuffle([...sameCat, ...otherCat])
      .slice(0, 3)
      .map(r => ({ text: r.ausdrucke[0], correct: false }));
    return shuffle([{ text: correct, correct: true }, ...distractors]);
  }

  selectOption(opt: QuizOption) {
    if (this.answered) return;
    this.selectedOption = opt.text;
    this.answered = true;
    if (opt.correct) this.bekannt.push(this.current.id);
    else this.wiederholen.push(this.current.id);
  }

  nextQuestion() { this.advance('quiz'); }

  private advance(mode: 'learn' | 'quiz') {
    if (this.currentIndex < this.queue.length - 1) {
      this.currentIndex++;
      if (mode === 'quiz') this.prepareQuiz();
      else this.flipped = false;
    } else {
      this.step = 'results';
    }
  }

  optionClass(opt: QuizOption): string {
    if (!this.answered) return 'border-slate-200 text-slate-700 hover:border-violet-300 bg-white';
    if (opt.correct) return 'border-green-400 bg-green-50 text-green-800 font-semibold';
    if (opt.text === this.selectedOption) return 'border-red-400 bg-red-50 text-red-700';
    return 'border-slate-100 text-slate-400 bg-slate-50';
  }

  // ── RESULTS ───────────────────────────────────────
  retryWeak() {
    const weakIds = new Set(this.wiederholen);
    this.queue = shuffle(REDEMITTEL_DATA.filter(r => weakIds.has(r.id)));
    this.currentIndex = 0;
    this.bekannt = [];
    this.wiederholen = [];
    if (this.mode === 'quiz') { this.prepareQuiz(); this.step = 'quiz'; }
    else { this.flipped = false; this.step = 'learn'; }
  }

  restart() { this.step = 'pick'; }

  get weakCards(): Redemittel[] {
    const ids = new Set(this.wiederholen);
    return REDEMITTEL_DATA.filter(r => ids.has(r.id));
  }
}
