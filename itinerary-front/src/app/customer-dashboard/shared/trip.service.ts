import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

interface tripData {
  success: Boolean;
  data: [Object];
}

interface additionStatus {
  success: Boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TripService {
  private newTrip = new Subject<Object>();
  constructor(private http: HttpClient) {}

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
    return this.http.get<any>('/api/v1/trips');
  }

  getSingleTripData(tripID: String) {
    return this.http.get<tripData>('/api/v1/trips/' + tripID);
  }

  updateTripData(tripdata: any[][], tripID: String | null) {
    return this.http.put<tripData>('/api/v1/trips/' + tripID, {
      data: tripdata,
    });
  }

  addFriend(friends: string, tripID: String | null) {
    return this.http.patch<tripData>('/api/v1/trips/friends/' + tripID, {
      friendToAdd: friends,

    });
  }

  removeFriend(friends: string, tripID: String | null) {
    return this.http.post('/api/v1/trips/friends/' + tripID, {
      friendToDel: friends,
    });
  }

  getTripsAsFrnd() {
    return this.http.get<Object[]>('/api/v1/trips/others/');
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

  deleteTrip(tripID: String) {
    return this.http.delete('/api/v1/trips/' + tripID);
  }
}