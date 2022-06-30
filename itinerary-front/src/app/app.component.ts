import { Component } from '@angular/core';

declare global {
  interface Date {
    formatMMDDYYYY(): String;
  }
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'itinerary-front';
  constructor(){
    Date.prototype.formatMMDDYYYY = function () {
      return (
        this.getDate() + '-' + (this.getMonth() + 1) + '-' + this.getFullYear()
      );
    };
  }
}
