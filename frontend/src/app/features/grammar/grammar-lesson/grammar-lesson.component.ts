import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { GrammarService } from '../../../core/services/grammar.service';
import { GrammarLesson } from '../../../core/models/grammar.model';

@Component({
  selector: 'app-grammar-lesson',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './grammar-lesson.component.html',
})
export class GrammarLessonComponent implements OnInit {
  private grammarService = inject(GrammarService);
  private route = inject(ActivatedRoute);

  lesson: GrammarLesson | null = null;
  loading = true;

  ngOnInit() {
    const level = this.route.snapshot.paramMap.get('level')!;
    const id = this.route.snapshot.paramMap.get('lessonId')!;
    this.grammarService.getLesson(level, id).subscribe({
      next: (res) => { this.lesson = res.data; this.loading = false; },
      error: () => { this.loading = false; },
    });
  }
}
