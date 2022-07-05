import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from '../shared/users.service';
import { TripService } from '../shared/trip.service';

@Component({
  selector: 'app-single-trip',
  templateUrl: './single-trip.component.html',
  styleUrls: ['./single-trip.component.css'],
})
export class SingleTripComponent implements OnInit {
  display = false;
  dayData!: any[];
  cols!: any[];
  updateBtnStatus!: Boolean[][];
  tripname!: String;
  tripUrl: String | null;
  colsMetaData!: any[];
  metadata: any[] = [];
  endDate!: String;
  displayFriend: boolean = false;
  users: any = [];
  selectedUser: string = "";

  constructor(
    private tripService: TripService,
    private router: Router,
    private route: ActivatedRoute,
    private userServce: UsersService
  ) {
    this.tripUrl = this.route.snapshot.paramMap.get('tripUrl');
    let result = this.tripUrl?.match(/\w+/g);
    const tripNameFromUrl = result?.reduce((final_str, val: String) => {
      val = val[0].toUpperCase() + val.substring(1);
      if (final_str.length == 0) {
        final_str = final_str + val;
        return final_str;
      }
      final_str = final_str + ' ' + val;
      return final_str;
    }, '');

    this.tripname = tripNameFromUrl!;
  }

  ngOnInit(): void {
    this.tripService
      .getSingleTripData(this.tripname)
      .subscribe((tripData: any) => {
        if (tripData.success) {
          this.dayData = tripData.message.singleTripDetails.tripdata;
          const metaData = tripData.message.metaData;
          const numofdays = metaData.days;
          const date = tripData.message.metaData.startDate;
          const parts = date.split('/');
          const startDate = new Date(+parts[2], parts[1] - 1, +parts[0]);
          this.endDate = new Date(
            startDate.setDate(startDate.getDate() + numofdays)
          ).toLocaleDateString('en-GB');

          this.updateBtnStatus = new Array(numofdays)
            .fill(0)
            .map((idx, val) =>
              new Array(this.dayData[val][0].numberOfAct).fill(false)
            );

          this.metadata.push(metaData);
        } else {
          console.log(tripData);
        }
      });

    this.cols = [
      { field: 'time', header: 'Time' },
      { field: 'activity', header: 'Activity' },
    ];
    this.colsMetaData = [
      { field: 'startdate', header: 'Start Date' },
      { field: 'enddate', header: 'End Date' },
      { field: 'numofdays', header: 'Number of Days' },
      { field: 'destination', header: 'Destination' },
    ]; 

    //reading usernames for add a friend
    this.userServce.getUsers().subscribe(
      response =>
      {
        this.users = Object.values(response)
        this.users = this.users[1];
      })
   }

  showDialog() {
    this.display = true;
    this.displayFriend =true;
  }

  updateBtnClicked(dayIdx: number, actTimeIdx: number) {
    this.updateBtnStatus[dayIdx][actTimeIdx] = true;
  }

  deleteAct(dayIdx: number, actTimeIdx: number) {
    // console.log(dayIdx, actTimeIdx);
    this.dayData[dayIdx][0].numberOfAct -= 1;
    this.dayData[dayIdx][1].splice(actTimeIdx, 1);
    this.updateBtnStatus[dayIdx].splice(actTimeIdx, 1);
    console.log(this.updateBtnStatus[dayIdx]);
    this.tripService
      .updateTripData(this.dayData, this.tripname)
      .subscribe((data: any) => {
        console.log(data.success);
        console.log(this.dayData[dayIdx][0].numberOfAct);
      });
  }

  addActivity(dayIdx: number) {
    this.updateBtnStatus[dayIdx].push(true);
    this.dayData[dayIdx][0].numberOfAct += 1;
    this.dayData[dayIdx][1].push({
      time: '00:00',
      activity: '',
    });

    console.log(this.dayData[dayIdx]);
  }

  doneClicked(dayIdx: number, actTimeIdx: number) {
    // console.log('doneClicked', dayIdx, actTimeIdx);
    this.updateBtnStatus[dayIdx][actTimeIdx] = false;
    this.tripService
      .updateTripData(this.dayData, this.tripname)
      .subscribe((data: any) => {
        console.log(data.success);
      });
  }
  onChange(event: any): void{
    this.selectedUser = event["username"];
    this.displayFriend =false;
  }
}