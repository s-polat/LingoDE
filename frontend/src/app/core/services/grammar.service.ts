import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/api.model';
import { GrammarLesson } from '../models/grammar.model';

@Injectable({ providedIn: 'root' })
export class GrammarService {
  private http = inject(HttpClient);
  private base = `${environment.apiUrl}/grammar`;

  getAllLessons(): Observable<ApiResponse<GrammarLesson[]>> {
    return this.http.get<ApiResponse<GrammarLesson[]>>(this.base);
  }

  getLessonsByLevel(level: string): Observable<ApiResponse<GrammarLesson[]>> {
    return this.http.get<ApiResponse<GrammarLesson[]>>(`${this.base}/${level}`);
  }

  getLesson(level: string, id: string): Observable<ApiResponse<GrammarLesson>> {
    return this.http.get<ApiResponse<GrammarLesson>>(`${this.base}/${level}/${id}`);
  }
}
