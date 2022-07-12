import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BootComponent } from './boot/boot.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/auth.guard';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: 'boot',
    component: BootComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import(`../customer-dashboard/customer-dashboard.module`).then(
        (m) => m.CustomerDashboardModule
      ),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
