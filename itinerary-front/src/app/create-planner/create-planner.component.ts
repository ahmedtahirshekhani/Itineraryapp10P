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
  imageUrl!: String

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

  // add new trip
  handleClick() {
    /*
      Handle post request through this component and then
      forward response to parent dashboard which handles 
      message service display accordingly.
    */
    this.imageUrl = this.destination.url

    
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
    this.name = tripNameFormat!;

    this.tripService.addNewTrip(
      this.name,
      this.startDate,
      this.days,
      this.destination.name,
      this.imageUrl).subscribe(data => {
      this.ref.close(data.success);
    })
  }
}
