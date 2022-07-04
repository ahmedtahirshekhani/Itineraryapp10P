import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {InputTextModule} from 'primeng/inputtext';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from "@angular/forms";
import { ButtonModule } from 'primeng/button';
import { DividerModule } from "primeng/divider";
import {PasswordModule} from 'primeng/password';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersService } from './users.service';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InputTextModule,
    FormsModule,
    ButtonModule,
    DividerModule,
    PasswordModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
