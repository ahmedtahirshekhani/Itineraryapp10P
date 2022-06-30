import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { users } from '../users';

@Component({
  selector: 'app-who-paid-what',
  templateUrl: './who-paid-what.component.html',
  styleUrls: ['./who-paid-what.component.css']
})
export class WhoPaidWhatComponent implements OnInit {
  users: users[] = [];
  constructor(private service: UsersService) {      
  }

 ngOnInit(): void {
   this.service.getUsers().subscribe(items => this.users = items);
 }

}
