import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

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
  

  constructor(private http: HttpClient) { }

  getMyTrip() {
    return this.http.get<tripData>("/api/mytrips")
  }

  getSingleTripData(tripNameArg:String){
    return this.http.post<tripData>("/api/mytrips/single",{
      tripname:tripNameArg
    })
  }

  updateTripData(tripdata: any[][], tripname: String){
    return this.http.post<tripData>("/api/updatetrip",{
      name:tripname,
      data: tripdata})
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
