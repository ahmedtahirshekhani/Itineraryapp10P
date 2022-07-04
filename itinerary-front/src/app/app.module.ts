import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {InputTextModule} from 'primeng/inputtext';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from "@angular/forms";
import { ButtonModule } from 'primeng/button';
import { DividerModule } from "primeng/divider";
import {PasswordModule} from 'primeng/password';
import { WhoPaidWhatComponent } from './who-paid-what/who-paid-what.component';
import {TableModule} from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import { DialogModule } from "primeng/dialog";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    WhoPaidWhatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InputTextModule,
    FormsModule,
    ButtonModule,
    DividerModule,
    PasswordModule,
    TableModule,
    HttpClientModule,
    DynamicDialogModule,
    DialogModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
