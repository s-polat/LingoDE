import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';

import { WordService } from '../../core/services/word.service';

type DayActivity = { date: string; reviewed: number; correct: number };

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  private wordService = inject(WordService);

  stats: { total: number; byLevel: { _id: string; count: number }[]; dueToday: number } | null = null;
  streak = 0;
  last7: DayActivity[] = [];
  loading = true;

  levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  dayLabels = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];

  ngOnInit() {
    forkJoin({
      stats: this.wordService.getStats(),
      activity: this.wordService.getActivity(),
    }).subscribe({
      next: ({ stats, activity }) => {
        this.stats = stats.data;
        this.streak = activity.data.streak;
        this.last7 = activity.data.activity.slice(-7);
        this.loading = false;
      },
      error: () => { this.loading = false; },
    });
  }

  countForLevel(level: string): number {
    return this.stats?.byLevel.find((b) => b._id === level)?.count ?? 0;
  }

  get maxReviewed(): number {
    return Math.max(1, ...this.last7.map((d) => d.reviewed));
  }

  barHeight(day: DayActivity): number {
    return Math.round((day.reviewed / this.maxReviewed) * 100);
  }

  barColor(day: DayActivity): string {
    if (day.reviewed === 0) return 'bg-slate-100';
    const accuracy = day.correct / day.reviewed;
    if (accuracy >= 0.7) return 'bg-green-400';
    if (accuracy >= 0.5) return 'bg-yellow-400';
    return 'bg-red-400';
  }

  dayLabel(dateStr: string): string {
    const d = new Date(dateStr + 'T12:00:00');
    return this.dayLabels[d.getDay() === 0 ? 6 : d.getDay() - 1];
  }

  totalAccuracy(): number {
    const total = this.last7.reduce((s, d) => s + d.reviewed, 0);
    const correct = this.last7.reduce((s, d) => s + d.correct, 0);
    return total > 0 ? Math.round((correct / total) * 100) : 0;
  }
}
