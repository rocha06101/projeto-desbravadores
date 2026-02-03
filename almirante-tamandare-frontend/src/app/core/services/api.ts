import { Injectable } from '@angular/core';
import { Observable, of, throwError, delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  post<T>(url: string, body: any): Observable<T> {

    // MOCK DO LOGIN
    if (url === '/auth/login') {
      if (body.email === 'admin@email.com' && body.password === '123456') {
        return of({ token: 'fake-jwt-token' } as T).pipe(delay(800));
      }
      return throwError(() => new Error('Credenciais inválidas'));
    }

    return of(body as T).pipe(delay(500));
  }

  get<T>(url: string): Observable<T> {
    return of([] as T).pipe(delay(500));
  }
}
  