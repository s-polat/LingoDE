import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { WordService } from '../../core/services/word.service';
import { SessionService } from '../../core/services/session.service';
import { ExerciseSession, SessionByType } from '../../core/models/api.model';

type DayActivity = { date: string; reviewed: number; correct: number };

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  private wordService = inject(WordService);
  private sessionService = inject(SessionService);

  loading = true;

  mastery: { new: number; learning: number; mastered: number } = { new: 0, learning: 0, mastered: 0 };
  activity: DayActivity[] = [];
  streak = 0;

  recentSessions: ExerciseSession[] = [];
  byType: SessionByType[] = [];

  readonly typeLabels: Record<string, string> = {
    schreibtrainer: 'Schreibtrainer',
    muendlich: 'Mündlich',
    hochschul: 'Hochschul',
    tagesschreiben: 'Tages-Schreiben',
    leseverstehen: 'Leseverstehen',
    grammar: 'Gramer',
  };

  readonly subtypeLabels: Record<string, string> = {
    brief: 'Brief',
    essay: 'Essay',
    testdaf: 'TestDaF',
    dsh: 'DSH',
    goethe: 'Goethe',
    telc: 'telc',
    argumantasyon: 'Argümantasyon',
    zusammenfassung: 'Özet',
  };

  ngOnInit() {
    forkJoin({
      stats: this.wordService.getStats(),
      activity: this.wordService.getActivity(),
      sessions: this.sessionService.getStats(),
    }).subscribe({
      next: ({ stats, activity, sessions }) => {
        this.mastery = stats.data.mastery;
        this.streak = activity.data.streak;
        this.activity = activity.data.activity;
        this.recentSessions = sessions.data.recent;
        this.byType = sessions.data.byType;
        this.loading = false;
      },
      error: () => { this.loading = false; },
    });
  }

  get masteryTotal(): number {
    return this.mastery.new + this.mastery.learning + this.mastery.mastered;
  }

  masteryPct(n: number): number {
    return this.masteryTotal > 0 ? Math.round((n / this.masteryTotal) * 100) : 0;
  }

  heatColor(day: DayActivity): string {
    if (day.reviewed === 0) return 'bg-slate-100';
    if (day.reviewed >= 10) return 'bg-primary-600';
    if (day.reviewed >= 5) return 'bg-primary-400';
    return 'bg-primary-200';
  }

  scoreBarColor(score: number): string {
    if (score >= 75) return 'bg-green-500';
    if (score >= 50) return 'bg-yellow-400';
    return 'bg-red-400';
  }

  labelFor(session: ExerciseSession): string {
    const type = this.typeLabels[session.type] ?? session.type;
    const sub = session.subtype ? (this.subtypeLabels[session.subtype] ?? session.subtype) : '';
    return sub ? `${type} · ${sub}` : type;
  }

  byTypeLabel(bt: SessionByType): string {
    const type = this.typeLabels[bt._id.type] ?? bt._id.type;
    const sub = bt._id.subtype ? (this.subtypeLabels[bt._id.subtype] ?? bt._id.subtype) : '';
    return sub ? `${type} · ${sub}` : type;
  }

  formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' });
  }

  heatTooltip(day: DayActivity): string {
    return `${day.date}: ${day.reviewed} tekrar`;
  }
}
