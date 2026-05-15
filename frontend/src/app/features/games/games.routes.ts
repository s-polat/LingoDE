import { Routes } from '@angular/router';

export const GAMES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./games-home/games-home.component').then((m) => m.GamesHomeComponent),
  },
  {
    path: 'flashcard',
    loadComponent: () =>
      import('./flashcard/flashcard.component').then((m) => m.FlashcardComponent),
  },
  {
    path: 'matching',
    loadComponent: () =>
      import('./matching/matching.component').then((m) => m.MatchingComponent),
  },
];
