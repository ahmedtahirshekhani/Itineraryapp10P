import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { ObjectUnsubscribedError } from 'rxjs';
import { TripService } from '../trip.service';
import {DialogService} from 'primeng/dynamicdialog';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import { CreatePlannerComponent } from '../create-planner/create-planner.component';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css'],
  providers: [DialogService]
})
export class CustomerDashboardComponent implements OnInit {
  display = true;
  items: MenuItem[] = [];
  mytrips: any[] = [];
    
  constructor(public dialogService: DialogService) {}

  ref: DynamicDialogRef;

  ngOnInit():void {
    this.items = [
        {label: 'Create Planner', icon: 'pi pi-fw pi-plus', command: () => this.show()},
        {label: 'View All Planners', icon: 'pi pi-fw pi-eye'},
        {label: 'Contact', icon: 'pi pi-fw pi-phone'},
        {label: 'Logout', icon: 'pi pi-fw pi-sign-out'}

    ];
  }

  show() {
    this.ref = this.dialogService.open(CreatePlannerComponent, {
        header: 'Add a Planner',
        width: '40%',
        contentStyle: {"overflow": "auto"}
    });
  }

  ngOnDestroy() {
    if (this.ref) {
        this.ref.close();
    }
  }
}
