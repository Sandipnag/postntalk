import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { resolve } from 'dns';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(public jwtHelper: JwtHelperService) { }
  public isAuthenticated(): Promise<boolean> {
    const token = localStorage.getItem('AccessToken');
    // Check whether the token is expired and return
    // true or false
    return new Promise((resolve, reject) => !this.jwtHelper.isTokenExpired(token));
  }
}
