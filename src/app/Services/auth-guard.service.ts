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
    let tokenFromCookie = this.cookieService.get('AccessToken');
    if (token === tokenFromCookie) {
      return !this.jwtHelper.isTokenExpired(token);
    } else {
      return false;
    }
    // Check whether the token is expired and return
    // true or false
  }
}
