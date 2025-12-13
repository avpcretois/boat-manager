import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly TOKEN_KEY = 'auth_token';
  isLoggedIn = signal(this.hasToken());

  constructor(private http: HttpClient) { }

  private hasToken(): boolean {
    return sessionStorage.getItem(this.TOKEN_KEY) !== null;
  }

  login(username: string, password: string): Observable<boolean> {
    const token = btoa(`${username}:${password}`);
    return this.loginToServer(token)
      .pipe(
        tap((result) => {
          if (result) {
            sessionStorage.setItem(this.TOKEN_KEY, token);
            this.isLoggedIn.set(true);
          } else {
            this.logout();
          }
        })
      );
  }

  validateLogin(): Observable<boolean> {
    if (this.hasToken()) {
      const token = sessionStorage.getItem(this.TOKEN_KEY) as string;
      return this.loginToServer(token);
    }
    return of(false);
  }

  private loginToServer(token: string): Observable<boolean> {
    const httpHeaders = new HttpHeaders({
      'Authorization': 'Basic ' + token
    });
    return this.http
      .get<void>('/api/login', { observe: 'response', headers: httpHeaders })
      .pipe(map((response) => response.status === 204),
        catchError((_) => of(false)),
      );
  }

  logout(): void {
    sessionStorage.removeItem(this.TOKEN_KEY);
    this.isLoggedIn.set(false);
  }
}
