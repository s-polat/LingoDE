import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { filter } from 'rxjs/operators';
import { ToastComponent } from './shared/components/toast/toast.component';
import { AuthService } from './core/services/auth.service';

const MAIN_ROUTES = ['/dashboard', '/vocabulary', '/yazma', '/grammar', '/games', '/profile', '/login'];

const PAGE_TITLES: Record<string, string> = {
  '/vocabulary/add':               'Kelime Ekle',
  '/games/flashcard':              'Flashcard',
  '/games/matching':               'Eşleştirme',
  '/nvv':                          'NVV',
  '/kollokationen':                'Kollokationen',
  '/praepositionalverben':         'Präpositionalverben',
  '/schreibtrainer':               'Schreibtrainer',
  '/redemittel':                   'Redemittel',
  '/leseverstehen':                'Leseverstehen',
  '/hochschulschreibtrainer':      'Hochschule Schreiben',
  '/passivtrainer':                'Passiv Trainer',
  '/konjunktiv2':                  'Konjunktiv II',
  '/sprachbausteine':              'Sprachbausteine',
  '/muendlich':                    'Mündlich',
  '/satzstellung':                 'Satzstellung',
  '/tagesschreiben':               'Tages-Schreiben',
  '/yazma':                        'Yazma & Pratik',
  '/profile':                      'Profil',
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  auth     = inject(AuthService);
  private router   = inject(Router);
  private location = inject(Location);

  currentUrl = signal('');

  navItems = [
    { path: '/dashboard', label: 'Ana Sayfa', icon: 'home' },
    { path: '/vocabulary', label: 'Kelimeler', icon: 'book' },
    { path: '/yazma', label: 'Yazma', icon: 'pencil' },
    { path: '/grammar', label: 'Gramer', icon: 'graduation' },
    { path: '/games', label: 'Oyunlar', icon: 'game' },
  ];

  constructor() {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((e: any) => {
      this.currentUrl.set(e.urlAfterRedirects.split('?')[0]);
    });
  }

  get isSubPage(): boolean {
    const url = this.currentUrl();
    return !!url && !MAIN_ROUTES.includes(url);
  }

  get pageTitle(): string {
    const url = this.currentUrl();
    if (PAGE_TITLES[url]) return PAGE_TITLES[url];
    if (/^\/vocabulary\/[^/]+$/.test(url)) return 'Kelime Detayı';
    if (url.startsWith('/grammar/')) return 'Gramer';
    return '';
  }

  goBack(): void { this.location.back(); }
}
