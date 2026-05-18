import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../services/toast.service';

const MESSAGES: Record<number, string> = {
  0:   'Sunucuya bağlanılamıyor. İnternet bağlantını kontrol et.',
  400: 'Geçersiz istek gönderildi.',
  404: 'İstenen kaynak bulunamadı.',
  429: 'Çok fazla istek gönderildi. 15 dakika sonra tekrar dene.',
  500: 'Sunucu hatası oluştu. Lütfen tekrar dene.',
  503: 'Servis şu an kullanılamıyor.',
};

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastService);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      const serverMessage = err.error?.message;
      const message = serverMessage || MESSAGES[err.status] || `Beklenmeyen hata (${err.status}).`;
      toast.error(message);
      return throwError(() => err);
    }),
  );
};
