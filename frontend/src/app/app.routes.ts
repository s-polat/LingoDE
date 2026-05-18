import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
  {
    path: 'vocabulary',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/vocabulary/vocabulary.routes').then((m) => m.VOCABULARY_ROUTES),
  },
  {
    path: 'games',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/games/games.routes').then((m) => m.GAMES_ROUTES),
  },
  {
    path: 'grammar',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/grammar/grammar.routes').then((m) => m.GRAMMAR_ROUTES),
  },
  {
    path: 'nvv',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/nvv/nvv.component').then((m) => m.NvvComponent),
  },
  {
    path: 'praepositionalverben',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/praepositionalverben/praepositionalverben.component').then(
        (m) => m.PraepositionalverbenComponent
      ),
  },
  {
    path: 'schreibtrainer',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/schreibtrainer/schreibtrainer.component').then((m) => m.SchreibtrainerComponent),
  },
  {
    path: 'redemittel',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/redemittel/redemittel.component').then((m) => m.RedemittelComponent),
  },
  {
    path: 'leseverstehen',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/leseverstehen/leseverstehen.component').then((m) => m.LeseverstehenComponent),
  },
  {
    path: 'hochschulschreibtrainer',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/hochschulschreibtrainer/hochschulschreibtrainer.component').then((m) => m.HochschulschreibtrainerComponent),
  },
  {
    path: 'passivtrainer',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/passivtrainer/passivtrainer.component').then((m) => m.PassivtrainerComponent),
  },
  {
    path: 'konjunktiv2',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/konjunktiv2/konjunktiv2.component').then((m) => m.Konjunktiv2Component),
  },
  {
    path: 'sprachbausteine',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/sprachbausteine/sprachbausteine.component').then((m) => m.SprachbausteineComponent),
  },
  {
    path: 'muendlich',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/muendlich/muendlich.component').then((m) => m.MuendlichComponent),
  },
  {
    path: 'kollokationen',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/kollokationen/kollokationen.component').then((m) => m.KollokationenComponent),
  },
  {
    path: 'satzstellung',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/satzstellung/satzstellung.component').then((m) => m.SatzstellungComponent),
  },
  {
    path: 'tagesschreiben',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/tagesschreiben/tagesschreiben.component').then((m) => m.TagesschreibenComponent),
  },
  {
    path: 'profile',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/profile/profile.component').then((m) => m.ProfileComponent),
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
