import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AiService } from '../../core/services/ai.service';
import { WritingFeedback } from '../../core/models/api.model';

type TaskType = 'brief' | 'essay';
type Step = 'pick' | 'loading' | 'write' | 'analyzing' | 'feedback';

@Component({
  selector: 'app-schreibtrainer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './schreibtrainer.component.html',
})
export class SchreibtrainerComponent {
  private aiService = inject(AiService);

  step: Step = 'pick';
  taskType: TaskType = 'brief';
  prompt = '';
  topic = '';
  text = '';
  error = '';
  feedback: WritingFeedback | null = null;

  readonly minWords = 180;
  readonly maxWords = 260;

  get wordCount(): number {
    return this.text.trim() ? this.text.trim().split(/\s+/).length : 0;
  }

  get wordCountColor(): string {
    if (this.wordCount < this.minWords) return 'text-red-500';
    if (this.wordCount > this.maxWords) return 'text-orange-500';
    return 'text-green-600';
  }

  get canSubmit(): boolean {
    return this.wordCount >= this.minWords;
  }

  selectType(type: TaskType) {
    this.taskType = type;
    this.text = '';
    this.error = '';
    this.loadPrompt();
  }

  loadPrompt() {
    this.step = 'loading';
    this.aiService.generateWritingPrompt(this.taskType).subscribe({
      next: (res) => {
        this.prompt = res.data.prompt;
        this.topic = res.data.topic;
        this.step = 'write';
      },
      error: () => {
        this.error = 'Görev oluşturulamadı, tekrar dene.';
        this.step = 'pick';
      },
    });
  }

  newPrompt() {
    this.text = '';
    this.loadPrompt();
  }

  submit() {
    if (!this.canSubmit) return;
    this.step = 'analyzing';
    this.error = '';
    this.aiService.analyzeWriting(this.taskType, this.prompt, this.text).subscribe({
      next: (res) => { this.feedback = res.data; this.step = 'feedback'; },
      error: () => { this.error = 'Analiz başarısız, tekrar dene.'; this.step = 'write'; },
    });
  }

  restart() {
    this.step = 'pick';
    this.text = '';
    this.feedback = null;
    this.error = '';
  }

  tryAgain() {
    this.step = 'write';
    this.feedback = null;
  }

  scoreColor(punkte: number): string {
    if (punkte >= 20) return 'text-green-600';
    if (punkte >= 14) return 'text-yellow-600';
    return 'text-red-500';
  }

  scoreBar(punkte: number): number {
    return Math.round((punkte / 25) * 100);
  }

  noteColor(note: string): string {
    if (note === 'C2' || note === 'C1') return 'bg-green-100 text-green-700';
    if (note === 'B2') return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  }

  readonly kategorienLabels: Record<string, string> = {
    grammatik: 'Grammatik',
    wortschatz: 'Wortschatz',
    kohaerenz: 'Kohärenz',
    register: 'Register',
  };

  get kategorienEntries() {
    if (!this.feedback) return [];
    return Object.entries(this.feedback.kategorien).map(([key, val]) => ({
      key,
      label: this.kategorienLabels[key],
      ...val,
    }));
  }
}
