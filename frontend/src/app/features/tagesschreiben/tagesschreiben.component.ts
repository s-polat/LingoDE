import { Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AiService } from '../../core/services/ai.service';
import { TagesSchreibenPrompt, TagesSchreibenFeedback, TagesSchreibenArgumantasyon, TagesSchreibenZusammenfassung } from '../../core/models/api.model';

type Step = 'home' | 'loading' | 'aufgabe' | 'evaluating' | 'ergebnis';
type Modus = 'argumantasyon' | 'zusammenfassung';

const STREAK_KEY = 'ts_streak';
const LAST_DATE_KEY = 'ts_last_date';
const TIMER_SECONDS = 15 * 60;

@Component({
  selector: 'app-tagesschreiben',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tagesschreiben.component.html',
})
export class TagesschreibenComponent implements OnDestroy {
  private ai = inject(AiService);

  step: Step = 'home';
  modus: Modus = 'argumantasyon';
  aufgabe: TagesSchreibenPrompt | null = null;
  text = '';
  feedback: TagesSchreibenFeedback | null = null;
  error = '';

  timeLeft = TIMER_SECONDS;
  timerActive = false;
  private timerRef: ReturnType<typeof setInterval> | null = null;

  streak = this.loadStreak();

  get wordCount(): number {
    return this.text.trim() ? this.text.trim().split(/\s+/).length : 0;
  }

  get wordTarget(): string {
    return this.modus === 'argumantasyon' ? '100–150' : '80–100';
  }

  get wordTargetMin(): number {
    return this.modus === 'argumantasyon' ? 100 : 80;
  }

  get timerDisplay(): string {
    const m = Math.floor(this.timeLeft / 60).toString().padStart(2, '0');
    const s = (this.timeLeft % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  get timerColor(): string {
    if (this.timeLeft > 5 * 60) return 'text-amber-700';
    if (this.timeLeft > 2 * 60) return 'text-orange-600';
    return 'text-red-600';
  }

  get scoreColor(): string {
    const p = this.feedback?.gesamtpunkte ?? 0;
    if (p >= 80) return 'text-green-600';
    if (p >= 60) return 'text-amber-600';
    return 'text-red-500';
  }

  get kategorienList(): { key: string; label: string; value: { punkte: number; feedback: string } }[] {
    if (!this.feedback) return [];
    const labels: Record<string, string> = {
      wortschatz: 'Wortschatz',
      grammatik: 'Grammatik',
      kohaerenz: 'Kohärenz & Struktur',
      vollstaendigkeit: 'Vollständigkeit',
      formulierung: 'Formulierung',
      sprachlicheKorrektheit: 'Sprachliche Korrektheit',
    };
    return Object.entries(this.feedback.kategorien).map(([key, value]) => ({
      key,
      label: labels[key] ?? key,
      value,
    }));
  }

  asArgumantasyon(p: TagesSchreibenPrompt): TagesSchreibenArgumantasyon {
    return p as TagesSchreibenArgumantasyon;
  }

  asZusammenfassung(p: TagesSchreibenPrompt): TagesSchreibenZusammenfassung {
    return p as TagesSchreibenZusammenfassung;
  }

  selectModus(m: Modus): void {
    this.modus = m;
  }

  start(): void {
    this.step = 'loading';
    this.error = '';
    this.text = '';
    this.feedback = null;
    this.ai.getTagesSchreiben(this.modus).subscribe({
      next: (res) => {
        this.aufgabe = res.data;
        this.step = 'aufgabe';
        this.startTimer();
      },
      error: () => {
        this.error = 'Görev alınamadı, tekrar dene.';
        this.step = 'home';
      },
    });
  }

  submit(): void {
    if (!this.aufgabe) return;
    const aufgabeText = this.aufgabe.modus === 'argumantasyon'
      ? this.asArgumantasyon(this.aufgabe).aufgabe
      : this.asZusammenfassung(this.aufgabe).aufgabe;

    this.step = 'evaluating';
    this.stopTimer();
    this.ai.analyzeTagesSchreiben(this.modus, aufgabeText, this.text).subscribe({
      next: (res) => {
        this.feedback = res.data;
        this.step = 'ergebnis';
        this.updateStreak();
      },
      error: () => {
        this.error = 'Değerlendirme başarısız, tekrar dene.';
        this.step = 'aufgabe';
      },
    });
  }

  restart(): void {
    this.step = 'home';
    this.text = '';
    this.feedback = null;
    this.error = '';
    this.stopTimer();
    this.timeLeft = TIMER_SECONDS;
  }

  private startTimer(): void {
    this.timeLeft = TIMER_SECONDS;
    this.timerActive = true;
    this.timerRef = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.stopTimer();
      }
    }, 1000);
  }

  private stopTimer(): void {
    this.timerActive = false;
    if (this.timerRef) {
      clearInterval(this.timerRef);
      this.timerRef = null;
    }
  }

  private loadStreak(): number {
    const last = localStorage.getItem(LAST_DATE_KEY);
    const streak = parseInt(localStorage.getItem(STREAK_KEY) ?? '0', 10);
    if (!last) return 0;
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (last === today) return streak;
    if (last === yesterday) return streak;
    return 0;
  }

  private updateStreak(): void {
    const today = new Date().toDateString();
    const last = localStorage.getItem(LAST_DATE_KEY);
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    let streak = parseInt(localStorage.getItem(STREAK_KEY) ?? '0', 10);
    if (last === today) {
      // already wrote today, no change
    } else if (last === yesterday) {
      streak++;
    } else {
      streak = 1;
    }
    localStorage.setItem(STREAK_KEY, String(streak));
    localStorage.setItem(LAST_DATE_KEY, today);
    this.streak = streak;
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }
}
