import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfirmedValidator } from '../shared/confirmed.validator';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  image: string = "../../../assets/images/registration-background.jpg";
  value4: string | undefined;

  registerForm = this.fb.group({
    name: ['',Validators.required],
    email: ['',[Validators.required, Validators.email]],
    username: ['',Validators.required],
    password: ['',[Validators.required, Validators.pattern(
      /(?=.*\d)(?=.*[a-zA-Z0-9])(?=.*[@$!%*?&])([a-zA-Z0-9@$!%*?&]{8,})/g
    ),]],
    cpassword: ['',[Validators.required]],
  },
  {
    validator: ConfirmedValidator('password', 'cpassword')
  });

  constructor(private auth: AuthService, private fb: FormBuilder) { }
   
  get Password(){
    return this.registerForm.controls;
  }

  ngOnInit(): void {
  }

  registerUser(){
    console.warn(this.registerForm.value);
    this.auth.registerUser(
      this.registerForm.value.name,
      this.registerForm.value.username,
      this.registerForm.value.password,
      this.registerForm.value.email);
  }

}
