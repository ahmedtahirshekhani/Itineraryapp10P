import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreatePlannerComponent } from './create-planner/create-planner.component';
import { ContactComponent } from './contact/contact.component';
import { AuthService } from '../auth/shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css'],
  providers: [DialogService, MessageService],
})
export class CustomerDashboardComponent implements OnInit {
  display = true;
  items: MenuItem[] = [];
  mytrips: any[] = [];

  constructor(
    public dialogService: DialogService,
    public messageService: MessageService,
    private auth: AuthService,
    private router: Router
  ) {}

  newPlannerRef!: DynamicDialogRef;
  contactRef!: DynamicDialogRef;

  ngOnInit(): void {
    this.items = [
      {
        label: 'Create Planner',
        icon: 'pi pi-fw pi-plus',
        command: () => this.createPlanner(),
      },
      {
        label: 'View All Planners',
        icon: 'pi pi-fw pi-eye',
        routerLink: '/dashboard',
      },
      {
        label: 'Contact',
        icon: 'pi pi-fw pi-phone',
        command: () => this.contact(),
      },
      {
        label: 'Logout',
        icon: 'pi pi-fw pi-sign-out',
        command: () => this.logout(),
      },
    ];
  }

  logout() {
    // logout the user here
    this.auth.logout();
    this.router.navigate(['/boot']);
  }

  // dialog for new planner form
  createPlanner() {
    this.newPlannerRef = this.dialogService.open(CreatePlannerComponent, {
      header: 'Add a Planner',
      width: '40%',
      contentStyle: { overflow: 'auto' },
    });

    this.newPlannerRef.onClose.subscribe((status: boolean) => {
      if (status) {
        this.messageService.add({ severity: 'success', summary: 'Trip Added' });
      } else if (status == false) {
        this.messageService.add({
          severity: 'error',
          summary: 'Addition Failed',
        });
      }
    });
  }

  // dialog for contact page
  contact() {
    this.contactRef = this.dialogService.open(ContactComponent, {
      header: 'Connect With Us',
      width: '30%',
    });
  }

  ngOnDestroy() {
    if (this.newPlannerRef) {
      this.newPlannerRef.close();
    }

    if (this.contactRef) {
      this.contactRef.close();
    }
  }
}
