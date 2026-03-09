import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth';

const PUBLIC_ROUTES = ['/auth/login', '/auth/register', '/auth/refresh', '/auth/logout'];

export const authInterceptor: HttpInterceptorFn = (req, next) => {  

  const authService = inject(AuthService);
  const isPublicRoute = PUBLIC_ROUTES.some((route) => req.url.includes(route));
  const token = authService.getAccessToken();

  const authReq = !isPublicRoute && token ? req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  }) 
  : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status !== 401  || isPublicRoute) {
      return throwError(() => error);
      }
      return authService.refreshToken().pipe(
        switchMap((Tokens) => {
          const retried =req.clone({
            setHeaders: {
              Autorization: `Bearer ${Tokens.accessToken}`
            }
            });
            return next(retried);
          }),
        catchError((refreshError) => {
          authService.logout();
          return throwError(() => refreshError);
        })
      );
    })
  );
}; 