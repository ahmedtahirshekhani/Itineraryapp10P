import { Component } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AbstractControl, NonNullableFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService],
})
export class LoginComponent {
  credentialsForm = this.fb.group({
    username: ["", Validators.required],
    password: ["", Validators.required],
  });

  constructor(
    private auth: AuthService,
    private router: Router,
    public messageService: MessageService,
    private fb: NonNullableFormBuilder
  ) {}

  get username(): AbstractControl<string> | null {
    return this.credentialsForm.get('username');
  }

  get password(): AbstractControl<string> | null {
    return this.credentialsForm.get('password');
  }

  goRegister() {
    this.router.navigate(['register']);
  }

  loginUser() {
    this.auth.login(this.username!.value, this.password!.value).subscribe({
      next: () => {
        this.router.navigate(['dashboard']);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Invalid Credentials!',
        });
      },
    });
  }
}
