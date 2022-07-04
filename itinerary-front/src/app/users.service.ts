import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  registerUser(user: any){
    this.http.post('/api/register', user).subscribe(res =>
      {
      })
  }

}
