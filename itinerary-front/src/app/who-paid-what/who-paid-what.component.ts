import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { users } from '../users';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-who-paid-what',
  templateUrl: './who-paid-what.component.html',
  styleUrls: ['./who-paid-what.component.css']
})
export class WhoPaidWhatComponent implements OnInit {
  users: users[] = [];

  AddForm = new FormGroup({
    username: new FormControl('', Validators.required),
    item: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required),
  });

  
  constructor(private service: UsersService) {      
  }

 ngOnInit(): void {
   this.service.getUsers().subscribe(items => this.users = items);
 }
 displayBasic: boolean = false;

 showBasicDialog() {
  this.displayBasic = true;
}
onSubmit(){
  console.log("Added")
}
}
