import { inject, Injectable } from '@angular/core';
import { Boat } from './boat';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../auth/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class BoatService {
  private authService = inject(AuthenticationService);
  private httpClient = inject(HttpClient);

  getAllBoats(): Observable<Boat[]> {
    return this.httpClient.get<Boat[]>('/api/boats', { headers: this.authService.getAuthenticationHeader() });
  }

  getBoat(id: string): Observable<Boat | undefined> {
    return of(undefined);
  }

  deleteBoat(id: string): Observable<boolean> {
    return of(true);
  }
}
