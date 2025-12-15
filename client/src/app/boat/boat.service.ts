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

  getBoat(identifier: string): Observable<Boat | undefined> {
    return this.httpClient.patch<Boat>(`/api/boats/${identifier}`, { headers: this.authService.getAuthenticationHeader() });
  }

  postBoat(boat: Boat): Observable<Boat | undefined> {
    return this.httpClient.patch<Boat>(`/api/boats/`, boat, { headers: this.authService.getAuthenticationHeader() });
  }

  patchBoat(identifier: string, boat: Boat): Observable<Boat> {
    return this.httpClient.patch<Boat>(`/api/boats/${identifier}`, boat, { headers: this.authService.getAuthenticationHeader() });
  }

  deleteBoat(identifier: string): Observable<void> {
    return this.httpClient.delete<void>(`/api/boats/${identifier}`, { headers: this.authService.getAuthenticationHeader() });
  }

}
