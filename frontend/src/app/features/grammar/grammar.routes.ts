import { Routes } from '@angular/router';

export const GRAMMAR_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./grammar-home/grammar-home.component').then((m) => m.GrammarHomeComponent),
  },
  {
    path: ':level',
    loadComponent: () =>
      import('./grammar-level/grammar-level.component').then((m) => m.GrammarLevelComponent),
  },
  {
    path: ':level/:lessonId',
    loadComponent: () =>
      import('./grammar-lesson/grammar-lesson.component').then((m) => m.GrammarLessonComponent),
  },
];
