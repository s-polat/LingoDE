import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private auth = inject(AuthService);
  loading = signal(false);
  error = signal('');

  async login(): Promise<void> {
    this.loading.set(true);
    this.error.set('');
    try {
      await this.auth.loginWithGoogle();
    } catch (e: any) {
      if (e?.code !== 'auth/popup-closed-by-user') {
        this.error.set('Giriş başarısız. Tekrar dene.');
      }
    } finally {
      this.loading.set(false);
    }
  }
}
