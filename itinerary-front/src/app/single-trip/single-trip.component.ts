import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-trip',
  templateUrl: './single-trip.component.html',
  styleUrls: ['./single-trip.component.css']
})
export class SingleTripComponent implements OnInit {
  display = false;
  constructor() { }

  ngOnInit(): void {
  }

  showDialog(){

    this.display = true

  }

}
