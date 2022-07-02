import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import {ButtonModule} from 'primeng/button';
import {SidebarModule} from 'primeng/sidebar';
import {MenuItemContent, MenuModule} from 'primeng/menu';
import {CardModule} from 'primeng/card';
import { PanelModule } from "primeng/panel";
import { Ripple, RippleModule } from "primeng/ripple";
import { UserMenuComponent } from './user-menu/user-menu.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TripService } from './trip.service';
import { SingleTripComponent } from './single-trip/single-trip.component';
import {DialogModule} from 'primeng/dialog';
import { AlltripsComponent } from './alltrips/alltrips.component';
import {TableModule} from 'primeng/table';
import { LayoutComponent } from './layout/layout.component';
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

@NgModule({
  declarations: [
    AppComponent,
    CustomerDashboardComponent,
    UserMenuComponent,
    SingleTripComponent,
    AlltripsComponent,
    LayoutComponent,
    CreatePlannerComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
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
    ReactiveFormsModule
  ],
  providers: [MenuItemContent, TripService],
  bootstrap: [AppComponent]
})
export class AppModule { }
