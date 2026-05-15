import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Word } from '../models/word.model';
import { ApiResponse, PaginatedResponse } from '../models/api.model';

@Injectable({ providedIn: 'root' })
export class WordService {
  private http = inject(HttpClient);
  private base = `${environment.apiUrl}/words`;

  getWords(filters?: { level?: string; type?: string; search?: string; page?: number; limit?: number }): Observable<PaginatedResponse<Word>> {
    let params = new HttpParams();
    if (filters?.level) params = params.set('level', filters.level);
    if (filters?.type) params = params.set('type', filters.type);
    if (filters?.search) params = params.set('search', filters.search);
    if (filters?.page) params = params.set('page', filters.page);
    if (filters?.limit) params = params.set('limit', filters.limit);
    return this.http.get<PaginatedResponse<Word>>(this.base, { params });
  }

  getWord(id: string): Observable<ApiResponse<Word>> {
    return this.http.get<ApiResponse<Word>>(`${this.base}/${id}`);
  }

  createWord(word: Partial<Word>): Observable<ApiResponse<Word>> {
    return this.http.post<ApiResponse<Word>>(this.base, word);
  }

  updateWord(id: string, word: Partial<Word>): Observable<ApiResponse<Word>> {
    return this.http.put<ApiResponse<Word>>(`${this.base}/${id}`, word);
  }

  deleteWord(id: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.base}/${id}`);
  }

  getReviewWords(level?: string, limit = 10): Observable<ApiResponse<Word[]>> {
    let params = new HttpParams().set('limit', limit);
    if (level) params = params.set('level', level);
    return this.http.get<ApiResponse<Word[]>>(`${this.base}/review`, { params });
  }

  reviewWord(id: string, quality: number): Observable<ApiResponse<Word>> {
    return this.http.post<ApiResponse<Word>>(`${this.base}/${id}/review`, { quality });
  }

  getStats(): Observable<ApiResponse<{ total: number; byLevel: { _id: string; count: number }[]; dueToday: number }>> {
    return this.http.get<ApiResponse<any>>(`${this.base}/stats`);
  }
}
