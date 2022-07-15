import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TripService } from '../shared/trip.service';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-alltrips',
  templateUrl: './alltrips.component.html',
  styleUrls: ['./alltrips.component.css'],
})
export class AlltripsComponent implements OnInit {
  mytrips: any[] = [];
  friendTrips: any[] = [];
  public subscription: Subscription;

  constructor(private tripService: TripService, private router: Router,private messageService: MessageService) {}

  ngOnInit(): void {
    this.tripService.getMyTrip().subscribe({
      next: (res) => {
        this.mytrips = res;
      },
    });

    // listen for new Trips being added
    this.subscription = this.tripService.updateTripList().subscribe((trip) => {
      this.mytrips.push(trip);
    });

    this.tripService.getTripsAsFrnd().subscribe((data: any) => {
      console.log(data);
      this.friendTrips = data;
    });
  }

  tripCardClicked(tripUrl: String) {
    this.router.navigate(['dashboard/' + tripUrl]);

    // this.router.navigateByUrl('/singletrip', { state: { tripName: tripname } });
  }

  // update mytrips list to reflect removal on screen sans netwrok call
  removeFromList(tripId: string): void {
    for (let i = 0; i < this.mytrips.length; i++) {
      if (this.mytrips[i]._id == tripId) {
        // remove just that deleted trip
        this.mytrips.splice(i, 1);
        break;
      }
    }
  }

  deleteTrip(tripId: string, event: any) {
    event.stopPropagation();
    console.log('delete', tripId);
    this.tripService.deleteTrip(tripId).subscribe((data: any) => {
      console.log(data.success);
      this.removeFromList(tripId);
      this.messageService.add({
        severity: 'error',
        summary: 'Removed',
        detail: 'Trip removed',
        life: 3000,
      });
    });

  }
}