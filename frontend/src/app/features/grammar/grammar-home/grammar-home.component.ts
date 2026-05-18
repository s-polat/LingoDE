import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-grammar-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './grammar-home.component.html',
})
export class GrammarHomeComponent {
  levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

  trainers = [
    { path: '/konjunktiv2', emoji: '💫', color: 'bg-indigo-100', title: 'Konjunktiv II Trainer', desc: 'İndikatif → Konj. II dönüşümü · 56 alıştırma' },
    { path: '/passivtrainer', emoji: '🔄', color: 'bg-orange-100', title: 'Passiv-Trainer', desc: 'Aktif → Pasif dönüşümü · 54 alıştırma' },
    { path: '/satzstellung', emoji: '🧱', color: 'bg-violet-100', title: 'Satzstellung', desc: 'TELC C1 · 40 alıştırma · kelime sıralaması' },
    { path: '/sprachbausteine', emoji: '📝', color: 'bg-violet-100', title: 'Sprachbausteine', desc: 'telc C1 boşluk doldurma · edat & bağlaç pratiği' },
  ];
}
