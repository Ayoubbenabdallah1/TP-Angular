import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Park } from '../models/park';

const URL = 'http://localhost:3001/parks';

@Injectable({
  providedIn: 'root'
})
export class ParkService {
  private readonly _http = inject(HttpClient);

  private readonly _parks = signal<Park[]>([]);
  parks = this._parks.asReadonly();

  getParks(): Observable<Park[]> {
    return this._http.get<Park[]>(URL)
      .pipe(tap(allParks => this._parks.set(allParks)));
  }

  getParkById(id: string): Observable<Park> {
    return this._http.get<Park>(`${URL}/${id}`);
  }

  deletePark(id: string): Observable<void> {
    return this._http.delete<void>(`${URL}/${id}`).pipe(
      tap(() => this._parks.update(list => list.filter(p => p.id !== id)))
    );
  }

  updatePark(park: Park): Observable<Park> {
    return this._http.put<Park>(`${URL}/${park.id}`, park).pipe(
      tap(updated => this._parks.update(list =>
        list.map(p => p.id === updated.id ? updated : p)))
    );
  }
}