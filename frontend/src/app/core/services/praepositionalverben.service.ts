import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse, PraepositionalverbEntry, ExercisesResponse } from '../models/api.model';

@Injectable({ providedIn: 'root' })
export class PraepositionalverbenService {
  private http = inject(HttpClient);
  private base = `${environment.apiUrl}/praepositionalverben`;

  getAll(level?: string): Observable<ApiResponse<PraepositionalverbEntry[]>> {
    const params: Record<string, string> = {};
    if (level) params['level'] = level;
    return this.http.get<ApiResponse<PraepositionalverbEntry[]>>(this.base, { params });
  }

  lookup(verb: string): Observable<ApiResponse<PraepositionalverbEntry[]>> {
    return this.http.get<ApiResponse<PraepositionalverbEntry[]>>(`${this.base}/${verb}`);
  }

  getExercises(level?: string, page = 1): Observable<ExercisesResponse> {
    const params: Record<string, string> = { page: String(page) };
    if (level) params['level'] = level;
    return this.http.get<ExercisesResponse>(`${this.base}/exercises`, { params });
  }

  save(entry: PraepositionalverbEntry): Observable<ApiResponse<PraepositionalverbEntry>> {
    return this.http.post<ApiResponse<PraepositionalverbEntry>>(this.base, entry);
  }
}
