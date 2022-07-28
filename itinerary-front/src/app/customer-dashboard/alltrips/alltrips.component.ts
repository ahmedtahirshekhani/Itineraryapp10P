import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TripService } from '../shared/trip.service';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from '../../error-handler.service';
@Component({
  selector: 'app-alltrips',
  templateUrl: './alltrips.component.html',
  styleUrls: ['./alltrips.component.scss'],
})
export class AlltripsComponent implements OnInit {
  mytrips: any[] = [];
  friendTrips: any[] = [];
  public subscription: Subscription;
  currentLoc: String = '';

  constructor(
    private tripService: TripService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private errorHandlerService: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((v) => {
      this.currentLoc = v['state'];
      if (this.currentLoc === 'myPlanners') {
        this.tripService.getMyTrip().subscribe({
          next: (res) => {
            this.mytrips = res;
          },
        });
      } else {
        this.tripService.getTripsAsFrnd().subscribe((data: any) => {
          this.mytrips = data;
        });
      }
    });

    /*
      Update trip list with newly a added trip that the user
      owns - prevent conflation of friends trips with the trips
      of the user.
    */
    if (this.currentLoc === 'myPlanners') {
      // listen for new Trips being added by the user
      this.subscription = this.tripService
        .updateTripList()
        .subscribe((trip) => {
          this.mytrips.push(trip);
        });
    }
    
    // calling spinner annimation
    this.errorHandlerService.showSpinner();
  }
  tripCardClicked(tripId: String) {
    console.log(tripId);
    this.router.navigate(['dashboard/' + tripId], { state: this.currentLoc });

    // this.router.navigateByUrl('/singletrip', { state: { tripName: tripname } });
  }

  // update mytrips list to reflect removal on screen sans netwrok call
  removeFromList(tripId: string): void {
    const index = this.mytrips.findIndex((trip) => trip._id === tripId);
    this.mytrips.splice(index, 1);
  }

  deleteTrip(tripId: string, event: any) {
    event.stopPropagation();
    this.tripService.deleteTrip(tripId).subscribe((data: any) => {
      console.log(data);
      this.removeFromList(tripId);
      this.messageService.add({
        severity: 'info',
        summary: 'Removed',
        detail: 'Trip removed',
        life: 3000,
      });
    });
  }
}
