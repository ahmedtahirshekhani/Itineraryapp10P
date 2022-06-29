import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { ObjectUnsubscribedError } from 'rxjs';
import { TripService } from '../trip.service';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent implements OnInit {
  display = true;
  items: MenuItem[] = [];
  mytrips: any[] = [];
    
  constructor() {
    
   }

  ngOnInit():void {
    this.items = [
        {label: 'Create Planner', icon: 'pi pi-fw pi-plus'},
        {label: 'View All Planners', icon: 'pi pi-fw pi-eye'},
        {label: 'Contact', icon: 'pi pi-fw pi-phone'},
        {label: 'Logout', icon: 'pi pi-fw pi-sign-out'}

    ];
    
}

  

}
