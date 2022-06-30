import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

interface tripData{
  success:Boolean,
  data: [String]
}

interface additionStatus {
  success: Boolean
}

@Injectable({
  providedIn: 'root'
})
export class TripService {

  constructor(private http: HttpClient) { }

  getMyTrip() {
    return this.http.get<tripData>("/api/mytrips")
  }

  addNewTrip(tripName: string, startDate: Date, duration: number, selectedCity: string) {
    return this.http.post<additionStatus>('/api/addTrip', {
      tripName,
      startDate,
      duration,
      selectedCity
    });
  }

}
