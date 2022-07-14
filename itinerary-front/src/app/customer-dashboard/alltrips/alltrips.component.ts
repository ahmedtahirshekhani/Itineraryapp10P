import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TripService } from '../shared/trip.service';
import { catchError, Observable, Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-alltrips',
  templateUrl: './alltrips.component.html',
  styleUrls: ['./alltrips.component.css'],
})
export class AlltripsComponent implements OnInit {
  mytrips: any[] = [];
  public subscription: Subscription;

  constructor(private tripService: TripService, private router: Router) {}

  ngOnInit(): void {
    this.tripService.getMyTrip().subscribe({
      next: (res) => {
        this.mytrips = res;
      },
      error: (error) => {
        console.log(error);
      },
    });

    // listen for new Trips being added
    this.subscription = this.tripService.updateTripList().subscribe((trip) => {
      this.mytrips.push(trip);
    });
  }

  /*
  private handleError<T>(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error('Error here', error);
      const message = `Server returned code ${error.status} with body ${error.error}`;
      throw new Error(`${operation} failed: ${message}`);
    };
  }
  */

  tripCardClicked(tripUrl: String) {
    this.router.navigate(['dashboard/' + tripUrl]);

    // this.router.navigateByUrl('/singletrip', { state: { tripName: tripname } });
  }

  // update mytrips list to reflect removal on screen sans netwrok call
  removeFromList(name: string): void {
    for (let i = 0; i < this.mytrips.length; i++) {
      if (this.mytrips[i].name == name) {
        // remove just that deleted trip
        this.mytrips.splice(i, 1);
        break;
      }
    }
  }

  deleteTrip(name: string, event: any) {
    event.stopPropagation();
    console.log('delete', name);
    this.tripService.deleteTrip(name).subscribe((data: any) => {
      console.log(data.success);
    });
    this.removeFromList(name);
  }
}
