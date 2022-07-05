import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService,
              private router: Router,
              private user: UserService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log(this.auth.isLoggedIn);
    if (this.auth.isLoggedIn) {
      return true;
    }
    return this.user.isLoggedIn().pipe(map(res => {
      console.log(res.status);
      if (res.status) {
        this.auth.setLoggedIn(true);
        return true;
      } else {
        console.log('here');
        this.router.navigate(['boot']);
        return false;
      }
    }));
  }
}
