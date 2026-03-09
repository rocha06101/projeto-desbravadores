import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiBaseUrl;


post<T>(url: string, body: unknown): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${url}`, body);
  }


  get<T>(url: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${url}`);
  }
}
  