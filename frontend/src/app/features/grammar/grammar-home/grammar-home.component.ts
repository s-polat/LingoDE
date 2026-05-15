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
}
