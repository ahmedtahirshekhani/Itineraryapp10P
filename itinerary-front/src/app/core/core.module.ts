import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BootComponent } from './boot/boot.component';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    BootComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    HttpClientModule
  ]
})
export class CoreModule { }
