import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, Toast } from '../../../core/services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
})
export class ToastComponent {
  toastService = inject(ToastService);

  trackById(_: number, t: Toast): number { return t.id; }

  bgClass(type: Toast['type']): string {
    return {
      error:   'bg-red-600',
      warning: 'bg-amber-500',
      success: 'bg-green-600',
      info:    'bg-slate-700',
    }[type];
  }

  icon(type: Toast['type']): string {
    return { error: '✕', warning: '⚠', success: '✓', info: 'ℹ' }[type];
  }
}
