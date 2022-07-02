import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { LocationsService } from '../locations.service';
import { TripService } from '../trip.service';
import { FormBuilder, Validators } from '@angular/forms';

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
  // reactive form group
  tripForm = this.fb.group({
  name: <string|unknown>['', Validators.required],
  startDate: <Date|unknown>[null, Validators.required],
  days: <number|unknown>[null, Validators.required],
  destination: <City|unknown>['', Validators.required],
  })

  imageUrl!: String;
  urlSlug!: String;
  cities: City[] = [];
  constructor(private locationService: LocationsService,
              private tripService: TripService,
              public ref: DynamicDialogRef,
              private fb: FormBuilder) { }
  
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

  // getters for form controrls and their values
  get name(): any { return this.tripForm.get('name') }
  get startDate(): any { return this.tripForm.get('startDate')?.value }
  get days(): any { return this.tripForm.get('days')?.value }
  get destination(): any { return this.tripForm.get('destination')?.value } 

  // method formats the urlSlug attribute
  getUrlSlug(){
    const nameSplit = this.name.value.toLowerCase().split(" ")
    return nameSplit.reduce((final_str: any, val: String) => {
      if (final_str.length == 0) {
        final_str = final_str + val;
        return final_str;
      }
      final_str = final_str + '-' + val;
      return final_str;
    }, '');
  }

  // method formats tripName into the requried format
  getTripNameFormat() {
    let result = this.name.value.match(/\w+/g);
    const tripNameFormat= result?.reduce((final_str: any, val: String) => {
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

  /*
    An update method that sends new trip details 
    to the AllTrips component to update the trips on-screen
  */
  sendTripData(): void {
    const trip = {
      name: this.name.value,
      startDate: this.startDate,
      days: this.days,
      destination: this.destination.name,
      imageUrl: this.imageUrl,
      urlSlug: this.urlSlug,
      createdOn: new Date().toString()
    };

    this.tripService.updateNewTrip(trip);
  }

  // add new trip to the database and reflect changes on-screen
  addTrip() {
    /*
      Handle post request through this component and then
      forward response to parent dashboard which handles 
      message-service display accordingly.
    */
    this.imageUrl = this.destination.url;
    this.name.setValue(this.getTripNameFormat());
    this.urlSlug = this.getUrlSlug();

    this.tripService.addNewTrip(
      this.name.value,
      this.startDate,
      this.days,
      this.destination.name,
      this.imageUrl,
      this.urlSlug).subscribe((data: any) => {
        if (data.success) {
          // update the screen (AllTrips Component)
          this.sendTripData();
        }
        
        // forward response to customer-dashboard
        this.ref.close(data.success);
      });
  }
}
