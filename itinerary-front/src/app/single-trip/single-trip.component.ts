import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TripService } from '../trip.service';

@Component({
  selector: 'app-single-trip',
  templateUrl: './single-trip.component.html',
  styleUrls: ['./single-trip.component.css']
})
export class SingleTripComponent implements OnInit {
  display = false;
  dayData!: any[];
  cols!: any[];
  updateBtnStatus !: Boolean[][];
  tripname !: String;
  // inputVal!: any[];
  constructor(private tripService: TripService,  private router: Router) {

    const state = this.router.getCurrentNavigation()
    this.tripname = state?.extras?.state?.['tripName']
   }

  


  ngOnInit(): void {
    

    this.tripService.getSingleTripData(this.tripname).subscribe((tripData : any)=>{
      console.log(tripData.message)
      if(tripData.success){
        this.dayData = tripData.message
        this.updateBtnStatus = [[false, false, false],[false, false, false]]
        
      }else{
        console.log(tripData)
      }
    })


    this.cols = [
      { field: 'time', header: 'Time' },
      { field: 'activity', header: 'Activity' },
     
    ];

  
// this.inputVal = this.dayData
    

   

  }

  showDialog() {

    this.display = true

  }

  updateBtnClicked(dayIdx : number, actTimeIdx:number){
    
      this.updateBtnStatus[dayIdx][actTimeIdx] = true
  }

  doneClicked(dayIdx : number, actTimeIdx:number){
    console.log("doneClicked", dayIdx, actTimeIdx)
    this.updateBtnStatus[dayIdx][actTimeIdx] = false
  }

  
}
