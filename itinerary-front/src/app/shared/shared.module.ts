import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedUiModule } from '../shared-ui/shared-ui.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    SharedUiModule
  ],
  exports: [
    SharedUiModule
  ]
})
export class SharedModule { }
