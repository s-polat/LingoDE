import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-yazma',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './yazma.component.html',
})
export class YazmaComponent {
  tools = [
    {
      path: '/tagesschreiben',
      emoji: '📅',
      color: 'bg-amber-100',
      title: 'Tages-Schreiben',
      desc: 'Günlük 15 dk yazma pratiği · AI değerlendirme',
    },
    {
      path: '/schreibtrainer',
      emoji: '✍️',
      color: 'bg-rose-100',
      title: 'Schreibtrainer',
      desc: 'C1 mektup & makale · AI değerlendirme',
    },
    {
      path: '/hochschulschreibtrainer',
      emoji: '🎓',
      color: 'bg-indigo-100',
      title: 'Hochschul-Schreibtrainer',
      desc: 'TestDaF / DSH yazma pratiği',
    },
    {
      path: '/leseverstehen',
      emoji: '📖',
      color: 'bg-teal-100',
      title: 'Leseverstehen',
      desc: 'Goethe C1 / TestDaF / DSH okuma pratiği',
    },
    {
      path: '/muendlich',
      emoji: '🎙️',
      color: 'bg-sky-100',
      title: 'Mündlicher Ausdruck',
      desc: 'TELC C1 Kurzreferat · 16 tema · AI değerlendirme',
    },
    {
      path: '/redemittel',
      emoji: '🗣️',
      color: 'bg-violet-100',
      title: 'Redemittel-Trainer',
      desc: '58 kalıp ifade · telc C1 yazma & konuşma',
    },
  ];
}
