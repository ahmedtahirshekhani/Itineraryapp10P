import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface isLoggedIn {
  status: Boolean
};

interface logoutStatus {
  success: boolean
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  isLoggedIn(): Observable<isLoggedIn> {
    return this.http.get<isLoggedIn>('api/v1/users/isloggedin');
  }

  logout() {
    return this.http.get<logoutStatus>('api/v1/users/logout');
  }
}
