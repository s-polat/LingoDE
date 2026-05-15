import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { WordService } from '../../../core/services/word.service';
import { Word } from '../../../core/models/word.model';

@Component({
  selector: 'app-vocabulary-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './vocabulary-detail.component.html',
})
export class VocabularyDetailComponent implements OnInit {
  private wordService = inject(WordService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  word: Word | null = null;
  loading = true;

  conjugationPersons = ['ich', 'du', 'er/sie/es', 'wir', 'ihr', 'sie/Sie'];
  conjugationKeys = ['ich', 'du', 'er', 'wir', 'ihr', 'sie'];

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.wordService.getWord(id).subscribe({
      next: (res) => { this.word = res.data; this.loading = false; },
      error: () => { this.loading = false; },
    });
  }

  delete() {
    if (!this.word?._id || !confirm('Bu kelimeyi silmek istiyor musun?')) return;
    this.wordService.deleteWord(this.word._id).subscribe(() => this.router.navigate(['/vocabulary']));
  }

  conjugationEntries(tense: 'präsens' | 'präteritum') {
    if (!this.word?.conjugation) return [];
    const obj = this.word.conjugation[tense];
    return this.conjugationKeys.map((k, i) => ({
      person: this.conjugationPersons[i],
      form: (obj as any)[k] ?? '',
    }));
  }
}
