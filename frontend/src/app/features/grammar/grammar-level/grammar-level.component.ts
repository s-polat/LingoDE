import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { GrammarService } from '../../../core/services/grammar.service';
import { GrammarLesson } from '../../../core/models/grammar.model';

@Component({
  selector: 'app-grammar-level',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './grammar-level.component.html',
})
export class GrammarLevelComponent implements OnInit {
  private grammarService = inject(GrammarService);
  private route = inject(ActivatedRoute);

  level = '';
  lessons: GrammarLesson[] = [];
  loading = true;

  ngOnInit() {
    this.level = this.route.snapshot.paramMap.get('level')?.toUpperCase() ?? '';
    this.grammarService.getLessonsByLevel(this.level).subscribe({
      next: (res) => { this.lessons = res.data; this.loading = false; },
      error: () => { this.loading = false; },
    });
  }
}
