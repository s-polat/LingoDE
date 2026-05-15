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

  // quality: 1=Bilmedim, 3=Zorlandım, 5=Bildim
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
}
