import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { WordService } from '../../core/services/word.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  private wordService = inject(WordService);

  stats: { total: number; byLevel: { _id: string; count: number }[]; dueToday: number } | null = null;
  loading = true;

  levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

  ngOnInit() {
    this.wordService.getStats().subscribe({
      next: (res) => { this.stats = res.data; this.loading = false; },
      error: () => { this.loading = false; },
    });
  }

  countForLevel(level: string): number {
    return this.stats?.byLevel.find((b) => b._id === level)?.count ?? 0;
  }
}
