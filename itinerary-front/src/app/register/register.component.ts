import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ConfirmedValidator } from './confirmed.validator';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  image:string = "assets/images/image2.jpg";
  value4: string | undefined;

  RegisterForm: FormGroup = new FormGroup({});

  constructor(private service :UsersService, private FB: FormBuilder) {
    this.RegisterForm = FB.group({
      name: ['',Validators.required],
      email: ['',[Validators.required, Validators.email]],
      username: ['',Validators.required],
      password: ['',[Validators.required, Validators.pattern(
        /(?=.*\d)(?=.*[a-zA-Z0-9])(?=.*[@$!%*?&])([a-zA-Z0-9@$!%*?&]{8,})/g
      ),]],
      cpassword: ['',[Validators.required]],
    },
    {
      validators: ConfirmedValidator('password', 'cpassword')
    })
   }

  get Password(){
    return this.RegisterForm.controls;
  }

  ngOnInit(): void {
  }

  RegisterUser(){
    console.warn(this.RegisterForm.value);
    this.service.registerUser(this.RegisterForm.value);
    // const email = target.querySelector('#email').value
    // const username = target.querySelector('#username').value
    // const password = target.querySelector('#password').value
    // const cpassword = target.querySelector('#cpassword').value
    // if(password === cpassword)
    // {
    //   if(/(?=.*\d)(?=.*[a-zA-Z0-9])(?=.*[@$!%*?&])([a-zA-Z0-9@$!%*?&]{8,})/g.test(password))
    //   {
    //     console.log(name, email, username, password, cpassword);
    //   }
    //   else
    //   {
    //     console.log("Invalid password")
    //   }
      
    // }
    // else
    // {
    //   console.log("unable to register user");
    // }
  }

}
