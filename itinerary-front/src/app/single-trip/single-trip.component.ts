import { Component, OnInit } from '@angular/core';

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
  // inputVal!: any[];
  constructor() { }

  


  ngOnInit(): void {

    this.cols = [
      { field: 'time', header: 'Time' },
      { field: 'activity', header: 'Activity' },
     
    ];

    this.dayData = [[
      {
       "time":"01:00",
       "activity": "Reached Kalam"
      },
      {
        "time":"02:30",
       "activity": "Lunch"
      },
      {
        "time":"04:00",
       "activity": "Leave for Mohmand Lake"
      },
    
    ]]
// this.inputVal = this.dayData
    

    this.updateBtnStatus = [[false, false, false]]

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
