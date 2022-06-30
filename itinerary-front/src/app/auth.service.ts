import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface loginStatus {
  success: boolean,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInStatus = false;

  constructor(private http: HttpClient) { }

  setLoggedIn(value: boolean) {
    this.loggedInStatus = value;
  }
  
  getUserDetails(username: string, password: string) {
    // post details to server, return user info if valid
    return this.http.post<loginStatus>('/api/login', {
      username,
      password
    })
  }
}
