import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfirmedValidator } from '../shared/confirmed.validator';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [MessageService],
})
export class RegisterComponent implements OnInit {
  image: string = '../../../assets/images/registration-background.jpg';

  registerForm = this.fb.group(
    {
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /(?=.*\d)(?=.*[a-zA-Z0-9])(?=.*[@$!%*?&])([a-zA-Z0-9@$!%*?&]{8,})/g
          ),
        ],
      ],
      cpassword: ['', [Validators.required]],
    },
    {
      validator: ConfirmedValidator('password', 'cpassword'),
    }
  );

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router,
    public msg: MessageService
  ) {}

  get Password() {
    return this.registerForm.controls;
  }

  ngOnInit(): void {}

  registerUser() {
    console.warn(this.registerForm.value);
    this.auth
      .registerUser(
        this.registerForm.value.name,
        this.registerForm.value.username,
        this.registerForm.value.password,
        this.registerForm.value.email
      )
      .subscribe({
        next: (data) => this.router.navigate(['login']),
        error: (error) => 
          this.msg.add({ severity: 'error', summary: 'Registration Failed' }),
      });
  }
}
