import { inject, Injectable } from '@angular/core';
import { BoatWithId } from './boat-with-id';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../auth/authentication.service';
import { Boat } from './boat';

@Injectable({
  providedIn: 'root',
})
export class BoatService {
  private authService = inject(AuthenticationService);
  private httpClient = inject(HttpClient);

  getAllBoats(): Observable<BoatWithId[]> {
    return this.httpClient.get<BoatWithId[]>('/api/boats', { headers: this.authService.getAuthenticationHeader() });
  }

  postBoat(boat: Boat): Observable<BoatWithId | undefined> {
    return this.httpClient.post<BoatWithId>(`/api/boats`, boat, { headers: this.authService.getAuthenticationHeader() });
  }

  patchBoat(id: number, boat: BoatWithId): Observable<BoatWithId> {
    return this.httpClient.patch<BoatWithId>(`/api/boats/${id}`, boat, { headers: this.authService.getAuthenticationHeader() });
  }

  deleteBoat(id: number): Observable<void> {
    return this.httpClient.delete<void>(`/api/boats/${id}`, { headers: this.authService.getAuthenticationHeader() });
  }

}
