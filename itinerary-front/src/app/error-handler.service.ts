import { Injectable } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ErrorDisplayComponent } from './error-display/error-display.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(public dialogService: DialogService) { }

  openDialog() {
    this.dialogService.open(ErrorDisplayComponent, {
      header: 'Server crashed',
      width: '40%',
      contentStyle: { overflow: 'auto' },
    });
  }

}
