import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface loginStatus {
  success: boolean,
  message: string
}

interface registerResponse {
  success: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInStatus = false;

  constructor(private http: HttpClient) { }

  get isLoggedIn() {
    return this.loggedInStatus;
  }

  setLoggedIn(value: boolean) {
    this.loggedInStatus = value;
  }
  
  getUserDetails(username: string|unknown, password: string|unknown) {
    // post details to server, return user info if valid
    return this.http.post<loginStatus>('/api/v1/users/login', {
      username,
      password
    })
  }

  registerUser(name: string, username: string, password: string, email: string ){
    return this.http.post<registerResponse>('/api/v1/users/register', {
      name,
      email,
      username,
      password
    }).subscribe(res =>
      {
        console.log(res);
      })
  }
}
