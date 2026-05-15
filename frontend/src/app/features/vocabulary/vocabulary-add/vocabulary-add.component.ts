import { Component, inject, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AiService } from '../../../core/services/ai.service';
import { WordService } from '../../../core/services/word.service';
import { AiWordAnalysis } from '../../../core/models/api.model';

type InputMode = 'manual' | 'camera' | 'file';
type Step = 'input' | 'extracting' | 'select' | 'analyzing' | 'review' | 'done';

@Component({
  selector: 'app-vocabulary-add',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vocabulary-add.component.html',
})
export class VocabularyAddComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('cameraInput') cameraInput!: ElementRef<HTMLInputElement>;

  private aiService = inject(AiService);
  private wordService = inject(WordService);
  private router = inject(Router);

  mode: InputMode = 'manual';
  step: Step = 'input';
  error = '';
  inputModes: InputMode[] = ['manual', 'camera', 'file'];

  // Manuel input
  manualWord = '';

  // Adım 2: kelime seçimi
  extractedWords: string[] = [];
  selectedWords = new Set<string>();

  // Adım 3-4: analiz & onay
  analyses: AiWordAnalysis[] = [];
  reviewIndex = 0;
  editMode = false;
  savedCount = 0;

  get currentAnalysis(): AiWordAnalysis | null {
    return this.analyses[this.reviewIndex] ?? null;
  }

  setMode(m: InputMode) { this.mode = m; this.error = ''; }

  // ── ADIM 1: Veri Girişi ──────────────────────────────────

  analyzeManual() {
    if (!this.manualWord.trim()) return;
    this.extractedWords = [this.manualWord.trim()];
    this.selectedWords = new Set([this.manualWord.trim()]);
    this.startBatchAnalysis();
  }

  onCameraCapture(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    this.step = 'extracting';
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(',')[1];
      this.aiService.extractFromImage(base64, file.type as any).subscribe({
        next: (res) => this.showWordSelection(res.data.words ?? []),
        error: () => { this.error = 'Görsel analizi başarısız.'; this.step = 'input'; },
      });
    };
    reader.readAsDataURL(file);
  }

  onFileUpload(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    this.step = 'extracting';
    this.aiService.extractFromFile(file).subscribe({
      next: (res) => this.showWordSelection(res.data.words ?? []),
      error: () => { this.error = 'Dosya işleme başarısız.'; this.step = 'input'; },
    });
  }

  // ── ADIM 2: Kelime Seçimi ────────────────────────────────

  private showWordSelection(words: string[]) {
    if (words.length === 0) {
      this.error = 'Hiç Almanca kelime bulunamadı.';
      this.step = 'input';
      return;
    }
    this.extractedWords = words;
    this.selectedWords = new Set(); // varsayılan: hiçbiri seçili
    this.step = 'select';
  }

  toggleWord(word: string) {
    if (this.selectedWords.has(word)) this.selectedWords.delete(word);
    else this.selectedWords.add(word);
  }

  selectAll() { this.selectedWords = new Set(this.extractedWords); }
  selectNone() { this.selectedWords.clear(); }

  get selectedCount() { return this.selectedWords.size; }

  // ── ADIM 3: Toplu Analiz ─────────────────────────────────

  startBatchAnalysis() {
    const words = Array.from(this.selectedWords);
    if (words.length === 0) return;
    this.step = 'analyzing';
    this.error = '';

    // 30'ar kelimelik gruplara böl
    const chunks = this.chunkArray(words, 30);
    this.analyses = [];
    this.analyzeChunks(chunks, 0);
  }

  private analyzeChunks(chunks: string[][], index: number) {
    if (index >= chunks.length) {
      this.reviewIndex = 0;
      this.savedCount = 0;
      this.step = 'review';
      return;
    }
    this.aiService.analyzeWordsBatch(chunks[index]).subscribe({
      next: (res) => {
        this.analyses.push(...res.data);
        this.analyzeChunks(chunks, index + 1);
      },
      error: () => {
        this.error = `Grup ${index + 1} analiz edilemedi.`;
        // Hata olsa bile devam et, bu grubu atla
        this.analyzeChunks(chunks, index + 1);
      },
    });
  }

  private chunkArray<T>(arr: T[], size: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < arr.length; i += size) chunks.push(arr.slice(i, i + size));
    return chunks;
  }

  // ── ADIM 4: Tek Tek Onay ─────────────────────────────────

  saveCurrentAndNext() {
    if (!this.currentAnalysis) return;
    this.wordService.createWord(this.currentAnalysis as any).subscribe({
      next: () => { this.savedCount++; this.next(); },
      error: () => this.next(),
    });
  }

  skipCurrent() { this.next(); }

  private next() {
    this.editMode = false;
    if (this.reviewIndex < this.analyses.length - 1) this.reviewIndex++;
    else this.step = 'done';
  }

  rejectAndEdit() { this.editMode = true; }

  addMeaning() {
    this.currentAnalysis?.meanings.push({ turkish: '', example_de: '', example_tr: '' });
  }

  removeMeaning(i: number) { this.currentAnalysis?.meanings.splice(i, 1); }

  get reviewProgress() {
    return Math.round(((this.reviewIndex + 1) / this.analyses.length) * 100);
  }

  readonly conjugationTenses: ('präsens' | 'präteritum')[] = ['präsens', 'präteritum'];

  conjugationRows(tense: string) {
    const conj = (this.currentAnalysis?.conjugation as any)?.[tense];
    if (!conj) return [];
    const order = ['ich', 'du', 'er', 'wir', 'ihr', 'sie'];
    const labels = ['ich', 'du', 'er/sie', 'wir', 'ihr', 'sie'];
    return order.map((k, i) => ({ label: labels[i], form: conj[k] ?? '—' }));
  }

  goToVocabulary() { this.router.navigate(['/vocabulary']); }
  addMore() {
    this.step = 'input';
    this.manualWord = '';
    this.extractedWords = [];
    this.selectedWords.clear();
    this.analyses = [];
    this.reviewIndex = 0;
    this.savedCount = 0;
  }
}
