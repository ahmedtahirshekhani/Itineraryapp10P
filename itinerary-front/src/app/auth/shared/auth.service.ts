import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import 'rxjs';
import * as moment from 'moment';

const jwt = new JwtHelperService();

class DecodedToken {
  exp: number = 0;
  username: string = '';
}

interface loginStatus {
  success: boolean;
  message: string;
}

interface registerResponse {
  success: boolean;
}
interface isLoggedIn {
  status: Boolean;
}

interface logoutStatus {
  success: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedInStatus = false;
  private decodedToken;

  constructor(private http: HttpClient) {
    this.decodedToken =
      JSON.parse(localStorage.getItem('ti_meta')!) || new DecodedToken();
  }

  get isLoggedIn() {
    return this.loggedInStatus;
  }

  setLoggedIn(value: boolean) {
    this.loggedInStatus = value;
  }

  login(
    username: string | unknown,
    password: string | unknown
  ): Observable<any> {
    // post details to server, return user info if valid

    return this.http
      .post<loginStatus>('/api/v1/users/login', {
        username,
        password,
      })
      .pipe(map((resp: any) => this.saveToken(resp)));
  }
  private saveToken(resp: any): string {
    this.decodedToken = jwt.decodeToken(resp.message);

    localStorage.setItem('ti_auth', resp.message);
    localStorage.setItem('ti_meta', JSON.stringify(this.decodedToken));

    return resp;
  }

  registerUser(
    name: string,
    username: string,
    password: string,
    email: string
  ) {
    return this.http.post<registerResponse>('/api/v1/users/register', {
      name,
      email,
      username,
      password,
    });
  }

  private getExpiration() {
    return moment.unix(this.decodedToken.exp);
  }

  public isAuthenticated(): boolean {
    return moment().isBefore(this.getExpiration());
  }

  public getAuthToken(): string {
    return localStorage.getItem('ti_auth')!;
  }

  public getUsername(): string {
    return this.decodedToken.username;
  }

  public getUserId(): string {
    return this.decodedToken.userId;
  }

  isUserLoggedIn(): Observable<isLoggedIn> {
    return this.http.get<isLoggedIn>('/api/v1/users/isloggedin');
  }

  logout() {
    localStorage.removeItem('ti_auth');
    localStorage.removeItem('ti_meta');

    this.decodedToken = new DecodedToken();
  }
}
