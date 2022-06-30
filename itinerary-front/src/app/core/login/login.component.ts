import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  username: string = "";
  password: string = "";
  
  constructor(private auth: AuthService,
              private router: Router,
              public messageService: MessageService) { }

  ngOnInit(): void {
  }

  loginUser() {
    this.auth.getUserDetails(this.username, this.password).subscribe(data => {
      if (data.success) {
        this.messageService.add({
          severity:'success', summary: 'Logging in', detail: `Welcome back ${this.username}`
        });
        // this.router.navigate(['dashboard']);
        this.auth.setLoggedIn(true);
      } else {
        this.messageService.add({
          severity:'error', summary: 'Invalid credentials!'
        });
      }
    });
    console.log(this.username, this.password);
  }
}
