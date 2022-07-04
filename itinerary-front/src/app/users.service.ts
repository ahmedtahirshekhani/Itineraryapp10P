import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  registerUser(name: string, username: string, password: string, email: string ){
    return this.http.post('/api/register', {
      name,
      email,
      username,
      password
    }).subscribe(res =>
      {
        console.log(res);
        // user;
      })
  }

}
