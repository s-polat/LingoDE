import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AiService } from '../../core/services/ai.service';
import { MuendlichFeedback } from '../../core/models/api.model';
import { SessionService } from '../../core/services/session.service';
import {
  MuendlichThema, MUENDLICH_THEMATA,
  REDEMITTEL_GRUPPEN, KATEGORIE_FARBEN,
} from './muendlich.data';

type Step = 'pick' | 'practice' | 'result';

@Component({
  selector: 'app-muendlich',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './muendlich.component.html',
})
export class MuendlichComponent {
  private aiSvc = inject(AiService);
  private sessionService = inject(SessionService);

  step: Step = 'pick';
  selectedThema: MuendlichThema | null = null;
  vortragText = '';
  loading = false;
  showRedemittel = false;
  feedback: MuendlichFeedback | null = null;
  error = '';

  readonly themata      = MUENDLICH_THEMATA;
  readonly redemittel   = REDEMITTEL_GRUPPEN;
  readonly kategorieFarben = KATEGORIE_FARBEN;

  get wordCount(): number {
    return this.vortragText.trim() ? this.vortragText.trim().split(/\s+/).length : 0;
  }

  get scoreColor(): string {
    const p = this.feedback?.gesamtpunkte ?? 0;
    if (p >= 80) return 'text-green-600';
    if (p >= 60) return 'text-sky-600';
    if (p >= 40) return 'text-yellow-600';
    return 'text-red-600';
  }

  get scoreBarColor(): string {
    const p = this.feedback?.gesamtpunkte ?? 0;
    if (p >= 80) return 'bg-green-500';
    if (p >= 60) return 'bg-sky-500';
    if (p >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  }

  kategorieColor(k: string): string {
    return this.kategorieFarben[k] ?? 'bg-slate-100 text-slate-600';
  }

  pick(thema: MuendlichThema) {
    this.selectedThema = thema;
    this.vortragText   = '';
    this.feedback      = null;
    this.error         = '';
    this.showRedemittel = false;
    this.step = 'practice';
  }

  evaluate() {
    if (!this.vortragText.trim() || this.loading) return;
    this.loading = true;
    this.error   = '';
    this.aiSvc.analyzeMuendlich(
      this.selectedThema!.leitfrage,
      [...this.selectedThema!.impulskarten],
      this.vortragText,
    ).subscribe({
      next: (r) => {
        this.feedback = r.data;
        this.step     = 'result';
        this.loading  = false;
        this.sessionService.save({
          type: 'muendlich',
          score: r.data.gesamtpunkte,
          note: r.data.niveau,
        });
      },
      error: () => {
        this.error   = 'Bir hata oluştu. Tekrar dene.';
        this.loading = false;
      },
    });
  }

  restart() { this.step = 'pick'; this.selectedThema = null; }
  retry()   { this.step = 'practice'; this.feedback = null; }
}
