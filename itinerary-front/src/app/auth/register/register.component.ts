import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ConfirmedValidator } from '../shared/confirmed.validator';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [MessageService],
})
export class RegisterComponent {
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
      validators: ConfirmedValidator('password', 'cpassword'),
    } 
  );

  constructor(
    private auth: AuthService,
    private fb: NonNullableFormBuilder,
    private router: Router,
    public msg: MessageService,
  ) {}

  get formControls() {
    return this.registerForm.controls;
  }

  register() {
    this.auth
      .registerUser(
        this.registerForm.value.name,
        this.registerForm.value.username,
        this.registerForm.value.password,
        this.registerForm.value.email
      )
      .subscribe({
        next: () => this.router.navigate(['login']),
        error: () => {
          this.msg.add({
            severity: 'error',
            summary: 'Registration Failed'
          });
        }
      });
  }
}
