import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from '../shared/users.service';
import { TripService } from '../shared/trip.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-single-trip',
  templateUrl: './single-trip.component.html',
  styleUrls: ['./single-trip.component.css'],
})
export class SingleTripComponent implements OnInit {
  tripname: String;
  display = false;
  dayData!: any[];
  cols!: any[];
  updateBtnStatus!: Boolean[][];
  tripId!: String;
  // tripID: String | null;
  colsMetaData!: any[];
  metadata: any[] = [];
  endDate!: String;
  addFriend: boolean = false;
  users: any = [];
  selectedUser: any = [];
  friends = new Array();
  displayFriend: boolean = false;

  constructor(
    private tripService: TripService,
    private router: Router,
    private route: ActivatedRoute,
    private userServce: UsersService,
    private messageService: MessageService
  ) {
    this.tripId = this.route.snapshot.paramMap.get('tripId') as string;
    console.log("tripID",this.tripId)
  }

  ngOnInit(): void {
    this.tripService
      .getSingleTripData(this.tripId)
      .subscribe((tripData: any) => {
        if (tripData.success) {
          this.tripname = tripData.message.metaData.name;
          this.dayData = tripData.message.singleTripDetails.tripdata;
          const metaData = tripData.message.metaData;
          const numofdays = metaData.days;
          const date = tripData.message.metaData.startDate;
          this.friends = tripData.message.metaData.friends;
          const parts = date.split('/');
          const startDate = new Date(+parts[2], parts[1] - 1, +parts[0]);
          this.endDate = new Date(
            startDate.setDate(startDate.getDate() + numofdays)
          ).toLocaleDateString('en-GB');
          this.friends = tripData.message.metaData.friends;
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
    this.userServce.getUsers().subscribe((response) => {
      this.users = Object.values(response);
      this.users = this.users[1];
    });
  }

  showAddFriend() {
    this.display = true;
    this.addFriend = true;
    const usernames = this.users.map((obj: any) => obj.username);
    const matched = this.friends.filter((value) => usernames.includes(value));
    this.users = this.users.filter(
      (el: { username: any }) => -1 == matched.indexOf(el.username)
    );
  }
  showDisplayFriend() {
    this.display = true;
    this.displayFriend = true;
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
      .updateTripData(this.dayData, this.tripId)
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
      .updateTripData(this.dayData, this.tripId)
      .subscribe((data: any) => {
        console.log(data.success);
      });
  }
  onChange(event: any): void {
    this.selectedUser.username = event['username'];
    this.friends.push(this.selectedUser.username);
    this.addFriend = false;
    this.tripService
      .addFriend(this.selectedUser.username, this.tripId)
      .subscribe({
        next: (res: any) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  closeView() {
    this.displayFriend = false;
  }

  removeFriend(friend: string) {
    //getting friend name to remove
    this.friends = this.friends.filter(function (name) {
      return name != friend;
    });

    this.users.push({ username: friend });
    this.messageService.add({
      severity: 'warn',
      summary: 'Successful',
      detail: 'Friend removed',
      life: 3000,
    });

    this.tripService.removeFriend(friend, this.tripId).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}