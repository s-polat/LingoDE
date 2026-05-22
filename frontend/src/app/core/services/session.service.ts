import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ApiResponse, CreateSessionDto, SessionStats } from '../models/api.model';

@Injectable({ providedIn: 'root' })
export class SessionService {
  private http = inject(HttpClient);
  private base = `${environment.apiUrl}/sessions`;

  save(dto: CreateSessionDto): void {
    this.http.post(this.base, dto).pipe(catchError(() => of(null))).subscribe();
  }

  getStats(): Observable<ApiResponse<SessionStats>> {
    return this.http.get<ApiResponse<SessionStats>>(`${this.base}/stats`);
  }
}
