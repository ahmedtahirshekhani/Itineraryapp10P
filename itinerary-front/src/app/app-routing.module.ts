import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { SingleTripComponent } from './single-trip/single-trip.component';

const routes: Routes = [
  { path: 'dashboard', component: CustomerDashboardComponent},
  { path: 'singletrip/:tripName', component: SingleTripComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
