import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TripService } from '../trip.service';

@Component({
  selector: 'app-alltrips',
  templateUrl: './alltrips.component.html',
  styleUrls: ['./alltrips.component.css']
})
export class AlltripsComponent implements OnInit {
  mytrips: any[] = [];
  constructor(private tripService: TripService, private router: Router ) { }

  ngOnInit(): void {
    this.tripService.getMyTrip().subscribe((data : any)=>{
      if(data.success){
        const dataVal = data.data
        this.mytrips = dataVal.tripdata
        console.log(this.mytrips)
      }else{
        console.log(data.err)
      }
    })
  }

  tripCardClicked(tripName: String){
   this.router.navigate(['singletrip/'+ tripName]);

    // this.router.navigateByUrl('/singletrip', { state: { tripName: tripname } });
  }

}
