import { Component, OnInit } from '@angular/core';

interface City {
  name: string,
  code: string
}

@Component({
  selector: 'app-create-planner',
  templateUrl: './create-planner.component.html',
  styleUrls: ['./create-planner.component.css']
})
export class CreatePlannerComponent implements OnInit {
  tripName: string;
  startDate: Date;
  duration: number;
  selectedCity: string;
  cities: City[];

  constructor() { }

  ngOnInit(): void {
  }

}
