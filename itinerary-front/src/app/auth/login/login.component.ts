import { Component } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService],
})
export class LoginComponent {
  credentialsForm = this.fb.group({
    username: <string | unknown>['', Validators.required],
    password: <string | unknown>['', Validators.required],
  });

  constructor(
    private auth: AuthService,
    private router: Router,
    public messageService: MessageService,
    private fb: FormBuilder
  ) { }

  get username(): any {
    return this.credentialsForm.get('username');
  }
  get password(): any {
    return this.credentialsForm.get('password');
  }

  clearInput(): void {
    this.username.reset();
    this.password.reset();
  }

  goRegister() {
    this.router.navigate(['register']);
  }

  loginUser() {
    this.auth
      .login(this.username.value, this.password.value)
      .subscribe({
        next: (data: any) => {
          this.auth.setLoggedIn(true);
          this.router.navigate(['dashboard']);
        },
        error: (err: Error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Invalid Credentials!',
          });
        }
      });
    // reset the fields
    this.clearInput();
  }
}
