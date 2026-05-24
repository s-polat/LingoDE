import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Redemittel, REDEMITTEL_DATA, REDEMITTEL_KATEGORIEN, shuffle } from './redemittel.data';

type Step = 'pick' | 'learn' | 'quiz' | 'results';
type Mode = 'learn' | 'quiz';

interface QuizOption { text: string; correct: boolean; }

@Component({
  selector: 'app-redemittel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './redemittel.component.html',
})
export class RedemittelComponent {
  step: Step = 'pick';
  mode: Mode = 'quiz';
  selectedKategorie = 'Alle';

  queue: Redemittel[] = [];
  currentIndex = 0;
  flipped = false;

  userSentence = '';
  scrambleActive = false;
  scrambleSource = '';
  scramblePool: string[] = [];
  scrambleBuilt: string[] = [];

  quizOptions: QuizOption[] = [];
  selectedOption: string | null = null;
  answered = false;

  bekannt: number[] = [];
  wiederholen: number[] = [];

  private historyMap = new Map<number, { selectedOption: string | null; quizOptions: QuizOption[] }>();

  get current(): Redemittel { return this.queue[this.currentIndex]; }
  get progress(): number { return Math.round((this.currentIndex / this.queue.length) * 100); }
  get hasWeak(): boolean { return this.wiederholen.length > 0; }

  get scrambleSentence(): string { return this.scrambleBuilt.join(' '); }
  get scrambleCorrect(): boolean { return this.scrambleBuilt.join(' ') === this.scrambleSource; }
  get scrambleDone(): boolean { return this.scramblePool.length === 0; }

  get wasWrong(): boolean {
    return !this.selectedOption || this.quizOptions.find(o => o.text === this.selectedOption)?.correct === false;
  }

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
    this.historyMap.clear();

    if (this.mode === 'quiz') {
      this.prepareQuiz();
      this.step = 'quiz';
    } else {
      this.resetLearnCard();
      this.step = 'learn';
    }
  }

  // ── LEARN ──────────────────────────────────────────────────
  flip() { this.flipped = true; }

  resetLearnCard() {
    this.flipped = false;
    this.userSentence = '';
    this.scrambleActive = false;
    this.scramblePool = [];
    this.scrambleBuilt = [];
    this.scrambleSource = '';
  }

  learnConfidence(level: 1 | 2 | 3 | 4) {
    if (level >= 3) this.bekannt.push(this.current.id);
    else this.wiederholen.push(this.current.id);
    this.advance('learn');
  }

  openScramble(sentence: string) {
    this.scrambleSource = sentence;
    this.scramblePool = shuffle(sentence.split(' '));
    this.scrambleBuilt = [];
    this.scrambleActive = true;
  }

  scramblePick(index: number) {
    this.scrambleBuilt.push(this.scramblePool[index]);
    this.scramblePool = this.scramblePool.filter((_, i) => i !== index);
  }

  scrambleUndo() {
    if (!this.scrambleBuilt.length) return;
    const last = this.scrambleBuilt.pop()!;
    this.scramblePool = [...this.scramblePool, last];
  }

  scrambleReset() {
    this.scramblePool = shuffle(this.scrambleSource.split(' '));
    this.scrambleBuilt = [];
  }

  // ── QUIZ ───────────────────────────────────────────────────
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

  private restoreOrPrepare() {
    const saved = this.historyMap.get(this.currentIndex);
    if (saved) {
      this.quizOptions    = saved.quizOptions;
      this.selectedOption = saved.selectedOption;
      this.answered       = true;
    } else {
      this.prepareQuiz();
    }
  }

  selectOption(opt: QuizOption) {
    if (this.answered) return;
    this.selectedOption = opt.text;
    this.answered = true;
    if (opt.correct) this.bekannt.push(this.current.id);
    else this.wiederholen.push(this.current.id);
    this.historyMap.set(this.currentIndex, {
      selectedOption: opt.text,
      quizOptions: [...this.quizOptions],
    });
  }

  prevQuestion() {
    if (this.currentIndex === 0) return;
    this.currentIndex--;
    this.restoreOrPrepare();
  }

  nextQuestion() { this.advance('quiz'); }

  private advance(mode: 'learn' | 'quiz') {
    if (this.currentIndex < this.queue.length - 1) {
      this.currentIndex++;
      if (mode === 'quiz') this.restoreOrPrepare();
      else this.resetLearnCard();
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

  // ── RESULTS ────────────────────────────────────────────────
  retryWeak() {
    const weakIds = new Set(this.wiederholen);
    this.queue = shuffle(REDEMITTEL_DATA.filter(r => weakIds.has(r.id)));
    this.currentIndex = 0;
    this.bekannt = [];
    this.wiederholen = [];
    this.historyMap.clear();
    if (this.mode === 'quiz') { this.prepareQuiz(); this.step = 'quiz'; }
    else { this.resetLearnCard(); this.step = 'learn'; }
  }

  restart() { this.step = 'pick'; }

  get weakCards(): Redemittel[] {
    const ids = new Set(this.wiederholen);
    return REDEMITTEL_DATA.filter(r => ids.has(r.id));
  }
}
