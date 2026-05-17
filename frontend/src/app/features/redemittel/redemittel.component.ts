import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Redemittel, REDEMITTEL_DATA, REDEMITTEL_KATEGORIEN, shuffle } from './redemittel.data';

type Step = 'pick' | 'practice' | 'results';

@Component({
  selector: 'app-redemittel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './redemittel.component.html',
})
export class RedemittelComponent {
  step: Step = 'pick';
  selectedKategorie = 'Alle';

  queue: Redemittel[] = [];
  currentIndex = 0;
  flipped = false;

  bekannt: number[] = [];
  wiederholen: number[] = [];

  get current(): Redemittel { return this.queue[this.currentIndex]; }
  get progress(): number { return Math.round(((this.currentIndex) / this.queue.length) * 100); }
  get hasWeak(): boolean { return this.wiederholen.length > 0; }

  get kategorienListe() {
    return [
      { name: 'Alle', emoji: '📚', count: REDEMITTEL_DATA.length },
      ...REDEMITTEL_KATEGORIEN.map(k => ({
        ...k,
        count: REDEMITTEL_DATA.filter(r => r.kategorie === k.name).length,
      })),
    ];
  }

  start(kategorie: string) {
    this.selectedKategorie = kategorie;
    const filtered = kategorie === 'Alle'
      ? [...REDEMITTEL_DATA]
      : REDEMITTEL_DATA.filter(r => r.kategorie === kategorie);
    this.queue = shuffle(filtered);
    this.currentIndex = 0;
    this.flipped = false;
    this.bekannt = [];
    this.wiederholen = [];
    this.step = 'practice';
  }

  flip() { this.flipped = true; }

  answer(known: boolean) {
    if (known) this.bekannt.push(this.current.id);
    else this.wiederholen.push(this.current.id);

    if (this.currentIndex < this.queue.length - 1) {
      this.currentIndex++;
      this.flipped = false;
    } else {
      this.step = 'results';
    }
  }

  retryWeak() {
    const weakIds = new Set(this.wiederholen);
    this.queue = shuffle(REDEMITTEL_DATA.filter(r => weakIds.has(r.id)));
    this.currentIndex = 0;
    this.flipped = false;
    this.bekannt = [];
    this.wiederholen = [];
    this.step = 'practice';
  }

  restart() {
    this.step = 'pick';
  }

  get weakCards(): Redemittel[] {
    const ids = new Set(this.wiederholen);
    return REDEMITTEL_DATA.filter(r => ids.has(r.id));
  }
}
