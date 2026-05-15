import { Routes } from '@angular/router';

export const VOCABULARY_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./vocabulary-list/vocabulary-list.component').then((m) => m.VocabularyListComponent),
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./vocabulary-add/vocabulary-add.component').then((m) => m.VocabularyAddComponent),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./vocabulary-detail/vocabulary-detail.component').then((m) => m.VocabularyDetailComponent),
  },
];
