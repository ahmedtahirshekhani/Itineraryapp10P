import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { LocationsService } from '../shared/locations.service';
import { TripService } from '../shared/trip.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ErrorHandlerService } from 'src/app/error-handler.service';
interface City {
  name: string;
  url: String;
}

@Component({
  selector: 'app-create-planner',
  templateUrl: './create-planner.component.html',
  styleUrls: ['./create-planner.component.css'],
})
export class CreatePlannerComponent implements OnInit {
  cities: City[] = [];
  imageUrl!: String;
  urlSlug!: String;
  startDateFormatted: String = '';

  // reactive form group
  tripForm = this.fb.group({
    name: <string | unknown>['', Validators.required],
    startDate: <Date | unknown>[null, Validators.required],
    days: <number | unknown>[null, Validators.required],
    destination: <City | unknown>['', Validators.required],
  });

  constructor(
    private locationService: LocationsService,
    private tripService: TripService,
    public ref: DynamicDialogRef,
    private fb: FormBuilder,
    private errorDisplayService: ErrorHandlerService,
  ) {}

  // populate the dropdown with defined locations
  ngOnInit(): void {
    this.locationService.getLocations().subscribe({
      next: (data: any) => {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
          this.cities.push({
            name: data[i].name,
            url: data[i].imageUrl,
          });
        }
      },
      error: (error) => {
        this.errorDisplayService.openDialog();
      },
    });
  }

  // getters for form controrls and their values
  get name(): any {
    return this.tripForm.get('name');
  }
  get startDate(): any {
    return this.tripForm.get('startDate')?.value;
  }
  get days(): any {
    return this.tripForm.get('days')?.value;
  }
  get destination(): any {
    return this.tripForm.get('destination')?.value;
  }

  getUrlSlug() {
    const nameSplit = this.name.value.toLowerCase().split(' ');
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
    const tripNameFormat = result?.reduce((final_str: any, val: String) => {
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
  sendTripData(tripId: String): void {
    const trip = {
      _id: tripId,
      name: this.name.value,
      startDate: this.startDateFormatted,
      days: this.days,
      destination: this.destination.name,
      imageUrl: this.imageUrl,
      urlSlug: this.urlSlug,
      createdOn: new Date().toLocaleDateString('en-GB'), // change this
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
    this.startDateFormatted = this.startDate.toLocaleDateString('en-GB'); // change this
    this.urlSlug = this.getUrlSlug();
    this.name.setValue(this.getTripNameFormat());

    this.tripService
      .addNewTrip(
        this.name.value,
        this.startDateFormatted,
        this.days,
        this.destination.name,
        this.imageUrl,
        this.urlSlug
      )
      .subscribe((data) => {
        if (data.success) {
          // update the screen
          this.sendTripData(data.tripId);
        }

        // forward server response to customer-dashboard
        this.ref.close(data.success);
      });
  }
}
