import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerDashboardRoutingModule } from './customer-dashboard-routing.module';
import { CustomerDashboardComponent } from '../customer-dashboard/customer-dashboard.component';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { MenuItemContent, MenuModule } from 'primeng/menu';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { Ripple, RippleModule } from 'primeng/ripple';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { TripService } from './shared/trip.service';
import { SingleTripComponent } from './single-trip/single-trip.component';
import { DialogModule } from 'primeng/dialog';
import { AlltripsComponent } from './alltrips/alltrips.component';
import { TableModule } from 'primeng/table';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { CreatePlannerComponent } from './create-planner/create-planner.component';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { ContactComponent } from './contact/contact.component';
import { ToastModule } from 'primeng/toast';
import { ReactiveFormsModule } from '@angular/forms';
import { TokenInterceptor } from '../token-interceptor.service';


@NgModule({
  declarations: [
    CustomerDashboardComponent,
    SingleTripComponent,
    AlltripsComponent,
    CreatePlannerComponent,
    ContactComponent,
  ],
  imports: [
    CommonModule,
    CustomerDashboardRoutingModule,
    ButtonModule,
    SidebarModule,
    MenuModule,
    CardModule,
    PanelModule,
    RippleModule,
    HttpClientModule,
    DialogModule,
    TableModule,
    InputTextModule,
    FormsModule,
    DynamicDialogModule,
    FormsModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
    InputNumberModule,
    ToastModule,
    ReactiveFormsModule,
  ],
  providers: [
    MenuItemContent,
    TripService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [
    CustomerDashboardComponent,
  ],
})
export class CustomerDashboardModule {}
