import { Component, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WordService } from '../../../core/services/word.service';
import { PraepositionalverbenService } from '../../../core/services/praepositionalverben.service';

interface Card {
  id: string;
  text: string;
  matched: boolean;
  selected: boolean;
  wrong: boolean;
}

interface PersonalBest {
  time: number;
  moves: number;
  date: string;
}

type GameState = 'setup' | 'loading' | 'playing' | 'done';
type GameMode = 'words' | 'preps';

@Component({
  selector: 'app-matching',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './matching.component.html',
})
export class MatchingComponent implements OnDestroy {
  private wordService = inject(WordService);
  private prepService = inject(PraepositionalverbenService);

  state: GameState = 'setup';
  error = '';

  gameMode: GameMode = 'words';
  levels = ['', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  selectedLevel = '';
  pairCount = 8;

  leftCards: Card[] = [];
  rightCards: Card[] = [];

  selectedLeft: Card | null = null;
  matchedCount = 0;
  moves = 0;
  seconds = 0;

  private wrongPerWord = new Map<string, number>();
  personalBest: PersonalBest | null = null;
  newRecord = false;

  private timer: ReturnType<typeof setInterval> | null = null;
  private wrongTimer: ReturnType<typeof setTimeout> | null = null;

  get totalPairs() { return this.leftCards.length; }
  get allMatched() { return this.matchedCount === this.totalPairs; }

  private bestKey() {
    return `matching_best_${this.gameMode}_${this.selectedLevel || 'all'}_${this.pairCount}`;
  }

  private loadBest() {
    const raw = localStorage.getItem(this.bestKey());
    this.personalBest = raw ? JSON.parse(raw) : null;
  }

  private saveBest() {
    const current: PersonalBest = {
      time: this.seconds,
      moves: this.moves,
      date: new Date().toLocaleDateString('tr-TR'),
    };
    const prev = this.personalBest;
    if (!prev || this.moves < prev.moves || (this.moves === prev.moves && this.seconds < prev.time)) {
      localStorage.setItem(this.bestKey(), JSON.stringify(current));
      this.personalBest = current;
      this.newRecord = true;
    } else {
      this.newRecord = false;
    }
  }

  startGame() {
    this.state = 'loading';
    this.error = '';
    this.loadBest();
    this.selectedLeft = null;
    this.matchedCount = 0;
    this.moves = 0;
    this.seconds = 0;
    this.newRecord = false;
    this.wrongPerWord.clear();

    if (this.gameMode === 'words') {
      this.startWordGame();
    } else {
      this.startPrepGame();
    }
  }

  private startWordGame() {
    this.wordService.getWords({ level: this.selectedLevel || undefined, limit: 50 }).subscribe({
      next: (res) => {
        const words = res.data.filter(w => w.meanings?.length > 0);
        if (words.length < 4) {
          this.error = 'Yeterli kelime yok. Önce kelime ekle.';
          this.state = 'setup';
          return;
        }
        const count = Math.min(this.pairCount, words.length);
        const picked = shuffle(words).slice(0, count);

        this.leftCards = shuffle(picked).map(w => ({
          id: w._id!,
          text: w.article ? `${w.article} ${w.german}` : w.german,
          matched: false, selected: false, wrong: false,
        }));
        this.rightCards = shuffle(picked).map(w => ({
          id: w._id!,
          text: w.meanings[0].turkish,
          matched: false, selected: false, wrong: false,
        }));

        this.state = 'playing';
        this.startTimer();
      },
      error: () => { this.error = 'Kelimeler yüklenemedi.'; this.state = 'setup'; },
    });
  }

  private startPrepGame() {
    this.prepService.getAll(this.selectedLevel || undefined).subscribe({
      next: (res) => {
        const verbs = res.data;
        if (verbs.length < 4) {
          this.error = 'Bu seviyede yeterli edat verisi yok.';
          this.state = 'setup';
          return;
        }
        const count = Math.min(this.pairCount, verbs.length);
        const picked = shuffle(verbs).slice(0, count);

        this.leftCards = shuffle(picked).map(v => ({
          id: `${v.verb}__${v.preposition}`,
          text: v.verb,
          matched: false, selected: false, wrong: false,
        }));
        this.rightCards = shuffle(picked).map(v => ({
          id: `${v.verb}__${v.preposition}`,
          text: `${v.preposition} · ${v.meaning_tr}`,
          matched: false, selected: false, wrong: false,
        }));

        this.state = 'playing';
        this.startTimer();
      },
      error: () => { this.error = 'Edat verileri yüklenemedi.'; this.state = 'setup'; },
    });
  }

  selectLeft(card: Card) {
    if (card.matched || card.wrong) return;
    if (this.selectedLeft === card) { card.selected = false; this.selectedLeft = null; return; }
    if (this.selectedLeft) this.selectedLeft.selected = false;
    card.selected = true;
    this.selectedLeft = card;
  }

  selectRight(card: Card) {
    if (!this.selectedLeft || card.matched || card.wrong) return;
    this.moves++;

    if (this.selectedLeft.id === card.id) {
      this.selectedLeft.matched = true;
      this.selectedLeft.selected = false;
      card.matched = true;
      this.selectedLeft = null;
      this.matchedCount++;
      if (this.allMatched) {
        this.stopTimer();
        this.saveBest();
        if (this.gameMode === 'words') this.submitSm2Reviews();
        this.state = 'done';
      }
    } else {
      const wrongCount = (this.wrongPerWord.get(this.selectedLeft.id) ?? 0) + 1;
      this.wrongPerWord.set(this.selectedLeft.id, wrongCount);
      this.wrongPerWord.set(card.id, (this.wrongPerWord.get(card.id) ?? 0) + 1);

      this.selectedLeft.wrong = true;
      card.wrong = true;
      const left = this.selectedLeft;
      this.selectedLeft = null;
      this.wrongTimer = setTimeout(() => {
        left.wrong = false; left.selected = false;
        card.wrong = false;
      }, 600);
    }
  }

  private submitSm2Reviews() {
    this.leftCards.forEach(c => {
      const wrongs = this.wrongPerWord.get(c.id) ?? 0;
      const quality = wrongs === 0 ? 5 : wrongs === 1 ? 3 : 1;
      this.wordService.reviewWord(c.id, quality).subscribe();
    });
  }

  private startTimer() {
    this.stopTimer();
    this.timer = setInterval(() => this.seconds++, 1000);
  }

  private stopTimer() {
    if (this.timer) { clearInterval(this.timer); this.timer = null; }
  }

  formatTime(s: number) {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  }

  cardClass(card: Card): string {
    if (card.matched)  return 'bg-green-100 border-green-400 text-green-700 opacity-50 cursor-default';
    if (card.wrong)    return 'bg-red-100 border-red-400 text-red-600';
    if (card.selected) return 'bg-primary-600 border-primary-600 text-white';
    return 'bg-white border-slate-200 text-slate-700';
  }

  get stars(): number {
    if (this.moves <= this.totalPairs) return 3;
    if (this.moves <= Math.round(this.totalPairs * 1.5)) return 2;
    return 1;
  }

  playAgain()   { this.startGame(); }
  backToSetup() { this.stopTimer(); this.state = 'setup'; }

  ngOnDestroy() {
    this.stopTimer();
    if (this.wrongTimer) clearTimeout(this.wrongTimer);
  }
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}
