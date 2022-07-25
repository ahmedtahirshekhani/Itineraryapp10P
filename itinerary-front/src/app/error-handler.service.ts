import { Injectable } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ErrorDisplayComponent } from './error-display/error-display.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor(
    public dialogService: DialogService,
    private spinner: NgxSpinnerService
  ) {}

  openDialog() {
    this.dialogService.open(ErrorDisplayComponent, {
      header: 'Server crashed',
      width: '40%',
      contentStyle: { overflow: 'auto' },
    });
  }

  showSpinner() {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }
}
