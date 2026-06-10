import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { GrammarService } from '../../../core/services/grammar.service';
import { GrammarLesson } from '../../../core/models/grammar.model';
import { GrammarExerciseComponent } from '../grammar-exercise/grammar-exercise.component';

@Component({
  selector: 'app-grammar-lesson',
  standalone: true,
  imports: [CommonModule, RouterLink, GrammarExerciseComponent],
  templateUrl: './grammar-lesson.component.html',
})
export class GrammarLessonComponent implements OnInit {
  private grammarService = inject(GrammarService);
  private route = inject(ActivatedRoute);

  lesson: GrammarLesson | null = null;
  loading = true;
  showExercises = signal(false);


  ngOnInit() {
    const level = this.route.snapshot.paramMap.get('level')!;
    const id = this.route.snapshot.paramMap.get('lessonId')!;
    this.grammarService.getLesson(level, id).subscribe({
      next: (res) => { this.lesson = res.data; this.loading = false; },
      error: () => { this.loading = false; },
    });
  }
}
