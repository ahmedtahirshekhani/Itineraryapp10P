import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { LocationsService } from '../locations.service';
import { TripService } from '../trip.service';

interface City {
  name: string,
}

@Component({
  selector: 'app-create-planner',
  templateUrl: './create-planner.component.html',
  styleUrls: ['./create-planner.component.css']
})
export class CreatePlannerComponent implements OnInit {
  tripName: string;
  startDate: Date;
  duration: number;
  selectedCity: City;
  cities: City[] = [];

  constructor(private locationService: LocationsService,
              private tripService: TripService,
              public ref: DynamicDialogRef) { }

  // populate the dropdown with defined locations
  ngOnInit(): void {
    this.locationService.getLocations().subscribe((data: any) => {
      if (data.success) {
        for (let i = 0; i < data.message.length; i++) {
          this.cities.push({name: data.message[i].name});
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
    this.tripService.addNewTrip(
      this.tripName,
      this.startDate,
      this.duration,
      this.selectedCity.name).subscribe(data => {
      this.ref.close(data.success);
    })
  }
}
