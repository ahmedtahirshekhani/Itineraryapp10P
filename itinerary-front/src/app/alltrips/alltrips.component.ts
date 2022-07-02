import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TripService } from '../trip.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-alltrips',
  templateUrl: './alltrips.component.html',
  styleUrls: ['./alltrips.component.css']
})
export class AlltripsComponent implements OnInit {
  mytrips: any[] = [];

  public subscription: Subscription;

  constructor(private tripService: TripService,
              private router: Router) { }

  ngOnInit(): void {
    // initial rendering of trips
    this.tripService.getMyTrip().subscribe((data : any)=>{
      if(data.success) {
        const dataVal = data.data
        this.mytrips = dataVal.tripdata
        console.log(this.mytrips)
      } else {
        console.log(data.err)
      }
    });

    // listen for new Trips being added
    this.subscription = this.tripService.updateTripList().subscribe(trip => {
      this.mytrips.push(trip);
    });  
  }

  tripCardClicked(tripUrl: String){
   this.router.navigate(['dashboard/'+ tripUrl]);

    // this.router.navigateByUrl('/singletrip', { state: { tripName: tripname } });
  }

}
