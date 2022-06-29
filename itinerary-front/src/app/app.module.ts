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

@NgModule({
  declarations: [
    AppComponent,
    CustomerDashboardComponent,
    UserMenuComponent,
    SingleTripComponent,
    AlltripsComponent
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
    DialogModule
  ],
  providers: [MenuItemContent, TripService],
  bootstrap: [AppComponent]
})
export class AppModule { }
