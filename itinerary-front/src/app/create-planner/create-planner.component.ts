import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { LocationsService } from '../locations.service';
import { TripService } from '../trip.service';

interface City {
  name: string,
  url: String
}

@Component({
  selector: 'app-create-planner',
  templateUrl: './create-planner.component.html',
  styleUrls: ['./create-planner.component.css']
})
export class CreatePlannerComponent implements OnInit {
  name: string = "";
  startDate!: Date;
  days!: number;
  destination!: City;
  cities: City[] = [];
  imageUrl!: String;
  urlSlug!: String;

  constructor(private locationService: LocationsService,
              private tripService: TripService,
              public ref: DynamicDialogRef) { }

  // populate the dropdown with defined locations
  ngOnInit(): void {
    this.tripService.getMyTrip().subscribe((rcvdata:any)=>{
      console.log(rcvdata.data.tripdata)
    })
    this.locationService.getLocations().subscribe((data: any) => {
      if (data.success) {
        for (let i = 0; i < data.message.length; i++) {
          this.cities.push({name: data.message[i].name, url: data.message[i].imageUrl});
        }
      } else {
        console.log(data.err);
      }
    });
  }

  getUrlSlug(){
    const nameSplit = this.name.toLowerCase().split(" ")
    return nameSplit.reduce((final_str, val: String) => {
      if (final_str.length == 0) {
        final_str = final_str + val;
        return final_str;
      }
      final_str = final_str + '-' + val;
      return final_str;
    }, '');
  }

  getTripNameFormat() {
    let result = this.name?.match(/\w+/g);
    const tripNameFormat= result?.reduce((final_str, val: String) => {
      val = val[0].toUpperCase() + val.substring(1);
      if (final_str.length == 0) {
        final_str = final_str + val;
        return final_str;
      }
      final_str = final_str + ' ' + val;
      return final_str;
    }, '');

    return tripNameFormat!;
  }

  sendTripData(): void {
    const trip = {
      name: this.name,
      startDate: this.startDate,
      days: this.days,
      destination: this.destination.name,
      imageUrl: this.imageUrl,
      urlSlug: this.urlSlug,
      createdOn: new Date().toString()
    };

    this.tripService.updateNewTrip(trip);
  }

  // add new trip
  addTrip() {
    /*
      Handle post request through this component and then
      forward response to parent dashboard which handles 
      message service display accordingly.
    */
    this.imageUrl = this.destination.url;
    this.name = this.getTripNameFormat();
    this.urlSlug = this.getUrlSlug();

    this.tripService.addNewTrip(
      this.name,
      this.startDate,
      this.days,
      this.destination.name,
      this.imageUrl,
      this.urlSlug).subscribe(data => {
        if (data.success) {
          // update the allTrips component
          this.sendTripData();
        }

        this.ref.close(data.success);
      })
  }
}
