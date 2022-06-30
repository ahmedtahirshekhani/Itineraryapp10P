import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { users } from './users';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {}
  getUsers(): Observable<users[]>{
    return this.http.get<users[]>("assets/user.json");
  }
}
