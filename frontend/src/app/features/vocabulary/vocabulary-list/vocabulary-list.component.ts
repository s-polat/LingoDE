import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { WordService } from '../../../core/services/word.service';
import { Word, CefrLevel } from '../../../core/models/word.model';

@Component({
  selector: 'app-vocabulary-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './vocabulary-list.component.html',
})
export class VocabularyListComponent implements OnInit {
  private wordService = inject(WordService);

  words: Word[] = [];
  loading = true;
  search = '';
  selectedLevel = '';
  total = 0;
  page = 1;
  readonly limit = 20;

  levels: (CefrLevel | '')[] = ['', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading = true;
    this.wordService.getWords({
      search: this.search || undefined,
      level: this.selectedLevel || undefined,
      page: this.page,
      limit: this.limit,
    }).subscribe({
      next: (res) => { this.words = res.data; this.total = res.total; this.loading = false; },
      error: () => { this.loading = false; },
    });
  }

  onSearch() {
    this.page = 1;
    this.load();
  }

  deleteWord(id: string, event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (!confirm('Bu kelimeyi silmek istiyor musun?')) return;
    this.wordService.deleteWord(id).subscribe(() => this.load());
  }

  get totalPages() { return Math.ceil(this.total / this.limit); }

  nextPage() { if (this.page < this.totalPages) { this.page++; this.load(); } }
  prevPage() { if (this.page > 1) { this.page--; this.load(); } }
}
