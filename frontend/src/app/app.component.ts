import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastComponent } from './shared/components/toast/toast.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  navItems = [
    { path: '/dashboard', label: 'Ana Sayfa', icon: 'home' },
    { path: '/vocabulary', label: 'Kelimeler', icon: 'book' },
    { path: '/games', label: 'Oyunlar', icon: 'game' },
    { path: '/grammar', label: 'Gramer', icon: 'graduation' },
    { path: '/praepositionalverben', label: 'Edatlar', icon: 'link' },
  ];
}
