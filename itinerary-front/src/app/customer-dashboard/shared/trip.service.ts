import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

interface tripData{
  success:Boolean,
  data: [Object]
}

interface additionStatus {
  success: Boolean
}

@Injectable({
  providedIn: 'root'
})
export class TripService {
  
  private newTrip = new Subject<Object>();

  constructor(private http: HttpClient) { }

  /*
    Method to which AllTrips subscribes to 
    update the list myTrips.
  */
  updateTripList(): Observable<Object> {
    return this.newTrip.asObservable();
  }

  /*
    Method called by CreatePlanner to send 
    newTrip data to be reflected on the AllTrips
    component.
  */
  updateNewTrip(trip: Object): void {
    this.newTrip.next(trip);
  }

  getMyTrip() {
    return this.http.get<tripData>("/api/v1/trips");
  }

  getSingleTripData(tripNameArg: String) {
    return this.http.get<tripData>('/api/v1/trips/' + tripNameArg);
  }

  updateTripData(tripdata: any[][], tripname: String) {
    return this.http.put<tripData>('/api/v1/trips/' + tripname, {
      data: tripdata,
    });
  }

  
  addNewTrip(
    name: string,
    startDate: String,
    days: number,
    destination: string,
    imageUrl: String,
    urlSlug: String
  ) {
    return this.http.post<additionStatus>('/api/v1/trips', {
      name,
      startDate,
      days,
      destination,
      imageUrl,
      urlSlug,
    });
  }


  deleteTrip(name: String) {
    return this.http.delete('/api/v1/trips/' + name);
  }

}
