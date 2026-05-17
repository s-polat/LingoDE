import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
  {
    path: 'vocabulary',
    loadChildren: () =>
      import('./features/vocabulary/vocabulary.routes').then((m) => m.VOCABULARY_ROUTES),
  },
  {
    path: 'games',
    loadChildren: () =>
      import('./features/games/games.routes').then((m) => m.GAMES_ROUTES),
  },
  {
    path: 'grammar',
    loadChildren: () =>
      import('./features/grammar/grammar.routes').then((m) => m.GRAMMAR_ROUTES),
  },
  {
    path: 'nvv',
    loadComponent: () =>
      import('./features/nvv/nvv.component').then((m) => m.NvvComponent),
  },
  {
    path: 'praepositionalverben',
    loadComponent: () =>
      import('./features/praepositionalverben/praepositionalverben.component').then(
        (m) => m.PraepositionalverbenComponent
      ),
  },
  {
    path: 'schreibtrainer',
    loadComponent: () =>
      import('./features/schreibtrainer/schreibtrainer.component').then((m) => m.SchreibtrainerComponent),
  },
  {
    path: 'hochschulschreibtrainer',
    loadComponent: () =>
      import('./features/hochschulschreibtrainer/hochschulschreibtrainer.component').then((m) => m.HochschulschreibtrainerComponent),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./features/profile/profile.component').then((m) => m.ProfileComponent),
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
