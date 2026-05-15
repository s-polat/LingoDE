import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { NvvEntry, NvvExercise } from '../models/nvv.model';

interface ApiResponse<T> { success: boolean; data: T; }
interface PagedResponse<T> extends ApiResponse<T> { total: number; page: number; pages: number; }

@Injectable({ providedIn: 'root' })
export class NvvService {
  private http = inject(HttpClient);
  private base = `${environment.apiUrl}/nvv`;

  getAll(category?: string, search?: string): Observable<ApiResponse<NvvEntry[]>> {
    const params: Record<string, string> = {};
    if (category) params['category'] = category;
    if (search) params['search'] = search;
    return this.http.get<ApiResponse<NvvEntry[]>>(this.base, { params });
  }

  getExercises(category?: string, page = 1): Observable<PagedResponse<NvvExercise[]>> {
    const params: Record<string, string> = { page: String(page) };
    if (category) params['category'] = category;
    return this.http.get<PagedResponse<NvvExercise[]>>(`${this.base}/exercises`, { params });
  }
}
