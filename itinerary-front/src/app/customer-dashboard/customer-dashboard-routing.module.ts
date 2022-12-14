import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlltripsComponent } from './alltrips/alltrips.component';
import { CustomerDashboardComponent } from './customer-dashboard.component';
import { SingleTripComponent } from './single-trip/single-trip.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerDashboardComponent,
    children: [
      { path: '', component: AlltripsComponent, data: { state: 'myPlanners' } },
      {
        path: 'friends',
        component: AlltripsComponent,
        data: { state: 'friendPlanners' },
      },
      { path: ':tripId', component: SingleTripComponent },
    ],
  },
  {
    path: 'boot',
    loadChildren: () => import(`../auth/auth.module`).then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerDashboardRoutingModule {}
