import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlltripsComponent } from './alltrips/alltrips.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { SingleTripComponent } from './single-trip/single-trip.component';

const routes: Routes = [
  { path: 'dashboard', component: AlltripsComponent},
  { path: 'dashboard/:tripUrl', component: SingleTripComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
