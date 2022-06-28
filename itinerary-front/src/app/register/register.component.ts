import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  image:string = "assets/images/image1.jpg";
  image2:string = "assets/images/image2.jpg";
  value4: string | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  RegisterUser(event: any){
    event.preventDefault()
    const target = event.target
    const name = target.querySelector('#name').value
    const email = target.querySelector('#email').value
    const username = target.querySelector('#username').value
    const password = target.querySelector('#password').value
    const cpassword = target.querySelector('#cpassword').value
    if(password === cpassword)
    {
      if(/(?=.*\d)(?=.*[a-zA-Z0-9])(?=.*[@$!%*?&])([a-zA-Z0-9@$!%*?&]{8,})/g.test(password))
      {
        console.log(name, email, username, password, cpassword);
      }
      else
      {
        console.log("Invalid password")
      }
      
    }
    else
    {
      console.log("unable to register user");
    }
  }

}
