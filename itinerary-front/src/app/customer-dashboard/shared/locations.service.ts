import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface locations {
  success: boolean;
  message: [Object];
}

@Injectable({
  providedIn: 'root',
})
export class LocationsService {
  constructor(private http: HttpClient) {}

  getLocations() {
    return this.http.get<locations>('/api/v1/locations');
  }
}
