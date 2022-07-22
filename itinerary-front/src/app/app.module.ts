import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { CustomerDashboardModule } from './customer-dashboard/customer-dashboard.module';
import { TokenInterceptor } from './token-interceptor.service';
import { ErrorDisplayComponent } from './error-display/error-display.component';
import { DialogService } from 'primeng/dynamicdialog';

@NgModule({
  declarations: [AppComponent, ErrorDisplayComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthModule,
    CustomerDashboardModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    DialogService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }

