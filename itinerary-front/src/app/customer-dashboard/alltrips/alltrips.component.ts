import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TripService } from '../shared/trip.service';

@Component({
  selector: 'app-alltrips',
  templateUrl: './alltrips.component.html',
  styleUrls: ['./alltrips.component.css'],
})
export class AlltripsComponent implements OnInit {
  mytrips: any[] = [];
  constructor(private tripService: TripService, private router: Router) {}

  ngOnInit(): void {
    this.tripService.getMyTrip().subscribe((data: any) => {
      if (data.success) {
        this.mytrips = data.data;
        // console.log(this.mytrips)
      } else {
        console.log(data.err);
      }
    });
  }

  tripCardClicked(tripUrl: String) {
    this.router.navigate(['dashboard/' + tripUrl]);

    // this.router.navigateByUrl('/singletrip', { state: { tripName: tripname } });
  }

  deleteTrip(name: String, event: any) {
    event.stopPropagation();
    console.log('delete', name);
    this.tripService.deleteTrip(name).subscribe((data: any) => {
      console.log(data.success);
    });
  }
}
