import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastComponent } from './shared/components/toast/toast.component';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  auth = inject(AuthService);
  navItems = [
    { path: '/dashboard', label: 'Ana Sayfa', icon: 'home' },
    { path: '/vocabulary', label: 'Kelimeler', icon: 'book' },
    { path: '/yazma', label: 'Yazma', icon: 'pencil' },
    { path: '/grammar', label: 'Gramer', icon: 'graduation' },
    { path: '/games', label: 'Oyunlar', icon: 'game' },
  ];
}
