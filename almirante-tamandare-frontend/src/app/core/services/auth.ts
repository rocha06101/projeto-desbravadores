import { Injectable, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ApiService } from './api';
import {
  AuthSession,
  LoginRequest,
  RefreshRequest,
  RegisterRequest,
  TokenResponse,
} from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly SESSION_KEY = 'auth_session';
  private readonly api = inject(ApiService);

  isLoggedIn = signal<boolean>(this.hasValidAccessToken());

  login(email: string, password: string): Observable<TokenResponse> {
    const playLoad: LoginRequest = { email, password };

    return this.api
      .post<TokenResponse>('/auth/login', playLoad)
      .pipe(tap((tokens) => this.setSession(tokens)));
  }

  register(email: string, password: string): Observable<void> {
    const payload: RegisterRequest = { email, password };
    return this.api.post<void>('/auth/register', payload);
  }

  me(): Observable<unknown> {
    return this.api.get<unknown>('/auth/me');
  }

  refreshToken(): Observable<TokenResponse> {
    const session = this.getSessionOrNull();

    if (!session?.refreshToken) {
      throw new Error('Refresh token Não encontrado');
    }

    const payload: RefreshRequest = { refreshToken: session.refreshToken };

    return this.api
      .post<TokenResponse>('/auth/refresh', payload)
      .pipe(tap((tokens) => this.setSession(tokens)));
  }

  logout(): void {
    const session = this.getSessionOrNull();

    if (session?.refreshToken) {
      this.api.post<void>('/auth/logout', { refreshToken: session.refreshToken }).subscribe({
        complete: () => void 0,
      });
    }

    this.clearSession();
  }

  getAccessToken(): string | null {
    const session = this.getSessionOrNull();
    if (!session) return null;

    if (new Date(session.accessTokenExpiresAt) <= new Date()) {
      return null;
    }

    return session.accessToken;
  }

  private setSession(tokens: TokenResponse): void {
    const session: AuthSession = {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      accessTokenExpiresAt: tokens.accessTokenExpiresAt,
      refreshTokenExpiresAt: tokens.refreshTokenExpiresAt,
    };

    localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
    this.isLoggedIn.set(true);
  }

  private clearSession(): void {
    localStorage.removeItem(this.SESSION_KEY);
    this.isLoggedIn.set(true);
  }

  private getSessionOrNull(): AuthSession | null {
    const raw = localStorage.getItem(this.SESSION_KEY);
    if (!raw) return null;

    try {
      return JSON.parse(raw) as AuthSession;
    } catch {
      this.clearSession();
      return null;
    }
  }

  private hasValidAccessToken(): boolean {
    return !!this.getAccessToken();
  }
}
