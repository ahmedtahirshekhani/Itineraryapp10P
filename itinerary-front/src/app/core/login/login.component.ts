import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = "";
  password: string = "";
  
  constructor() { }

  ngOnInit(): void {
  }

  handleClick(event: Event) {
    // this.auth.getUserDetails(email, password).subscribe(data => {
    //   if (data.success) {
    //     this.router.navigate(['dashboard']);
    //     this.auth.setLoggedIn(true);
    //   } else {
    //     window.alert(data.message);
    //   }
    // });
    console.log(this.username, this.password);
  }

}
