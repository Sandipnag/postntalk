import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(public jwtHelper: JwtHelperService, private cookieService: CookieService) { }
  public isAuthenticated(): boolean {
    let token = localStorage.getItem('AccessToken');
    if (this.jwtHelper.isTokenExpired(token)) {
      return false;
    }
    else {
      return true;
    }
  }

  public isLoggedIn(): boolean {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      return true;
    } else {
      return false;
    }
  }
}
