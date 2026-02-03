import { Injectable, signal, inject } from '@angular/core';
import { tap, Observable} from 'rxjs';
import { ApiService } from './api';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly TOKEN_KEY = 'auth_token';
  private api = inject(ApiService);

  isLoggedIn = signal<boolean>(this.hasToken());

  login(email: string, password: string): Observable<{token: string}> {
    return this.api.post<{token: string}>(
      '/auth/login',
      { email, password }
    ).pipe(
      tap(response => {
        localStorage.setItem(this.TOKEN_KEY, response.token);
        this.isLoggedIn.set(true);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.isLoggedIn.set(false);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }
}
