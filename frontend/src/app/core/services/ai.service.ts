import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse, AiWordAnalysis, ExtractedWordsResult, WritingFeedback } from '../models/api.model';

@Injectable({ providedIn: 'root' })
export class AiService {
  private http = inject(HttpClient);
  private base = `${environment.apiUrl}/ai`;

  analyzeWord(word: string): Observable<ApiResponse<AiWordAnalysis>> {
    return this.http.post<ApiResponse<AiWordAnalysis>>(`${this.base}/analyze`, { word });
  }

  extractFromImage(base64: string, mediaType = 'image/jpeg'): Observable<ApiResponse<ExtractedWordsResult>> {
    return this.http.post<ApiResponse<ExtractedWordsResult>>(`${this.base}/extract-image`, {
      image: base64,
      mediaType,
    });
  }

  extractFromFile(file: File): Observable<ApiResponse<ExtractedWordsResult>> {
    const form = new FormData();
    form.append('file', file);
    return this.http.post<ApiResponse<ExtractedWordsResult>>(`${this.base}/extract-file`, form);
  }

  analyzeWordsBatch(words: string[]): Observable<ApiResponse<AiWordAnalysis[]>> {
    return this.http.post<ApiResponse<AiWordAnalysis[]>>(`${this.base}/analyze-batch`, { words });
  }

  generateWritingPrompt(type: 'brief' | 'essay'): Observable<ApiResponse<{ prompt: string; topic: string }>> {
    return this.http.get<ApiResponse<{ prompt: string; topic: string }>>(`${this.base}/schreiben-aufgabe`, { params: { type } });
  }

  analyzeWriting(type: 'brief' | 'essay', prompt: string, text: string): Observable<ApiResponse<WritingFeedback>> {
    return this.http.post<ApiResponse<WritingFeedback>>(`${this.base}/schreiben`, { type, prompt, text });
  }
}
