import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { WordService } from '../../../core/services/word.service';
import { Word, CefrLevel } from '../../../core/models/word.model';

@Component({
  selector: 'app-flashcard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './flashcard.component.html',
  styleUrl: './flashcard.component.scss',
})
export class FlashcardComponent implements OnInit {
  private wordService = inject(WordService);

  words: Word[] = [];
  current = 0;
  flipped = false;
  loading = true;
  finished = false;
  selectedLevel = '';
  levels: (CefrLevel | '')[] = ['', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

  sessionCorrect = 0;
  sessionTotal = 0;

  private touchStartX = 0;
  private touchStartY = 0;
  private lastInteractionWasTouch = false;
  swipeClass = '';

  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    this.finished = false;
    this.current = 0;
    this.flipped = false;
    this.sessionCorrect = 0;
    this.sessionTotal = 0;
    this.wordService.getReviewWords(this.selectedLevel || undefined, 20).subscribe({
      next: (res) => { this.words = res.data; this.loading = false; },
      error: () => { this.loading = false; },
    });
  }

  get word(): Word | null { return this.words[this.current] ?? null; }

  flip() { this.flipped = !this.flipped; }

  rate(quality: 1 | 3 | 5) {
    if (!this.word) return;
    this.sessionTotal++;
    if (quality >= 3) this.sessionCorrect++;
    this.wordService.reviewWord(this.word._id!, quality).subscribe();
    this.flipped = false;
    if (this.current < this.words.length - 1) {
      this.current++;
    } else {
      this.finished = true;
    }
  }

  get accuracy(): number {
    return this.sessionTotal > 0 ? Math.round((this.sessionCorrect / this.sessionTotal) * 100) : 0;
  }

  onCardClick() {
    if (this.lastInteractionWasTouch) {
      this.lastInteractionWasTouch = false;
      return;
    }
    this.flip();
  }

  onTouchStart(e: TouchEvent) {
    this.lastInteractionWasTouch = true;
    this.touchStartX = e.changedTouches[0].clientX;
    this.touchStartY = e.changedTouches[0].clientY;
    this.swipeClass = '';
  }

  onTouchMove(e: TouchEvent) {
    if (!this.flipped) return;
    const dx = e.changedTouches[0].clientX - this.touchStartX;
    const dy = e.changedTouches[0].clientY - this.touchStartY;
    if (Math.abs(dx) > 20 && Math.abs(dx) > Math.abs(dy)) {
      this.swipeClass = dx > 0 ? 'swiping-right' : 'swiping-left';
    }
  }

  onTouchEnd(e: TouchEvent) {
    this.swipeClass = '';
    const dx = e.changedTouches[0].clientX - this.touchStartX;
    const dy = e.changedTouches[0].clientY - this.touchStartY;
    const isHorizontalSwipe = Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5;

    if (!isHorizontalSwipe) {
      this.flip();
      return;
    }

    if (this.flipped) {
      this.rate(dx > 0 ? 5 : 1);
    } else {
      this.flip();
    }
  }
}
