import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-games-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './games-home.component.html',
})
export class GamesHomeComponent {}
