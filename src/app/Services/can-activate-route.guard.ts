import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthGuardService } from '../Services/auth-guard.service';

@Injectable({
  providedIn: 'root'
})
export class CanActivateRouteGuard implements CanActivate {
  constructor(private authguardservice: AuthGuardService, private router: Router) { }
  canActivate(): boolean {
    if (!this.authguardservice.isAuthenticated() || !this.authguardservice.isLoggedIn()) {
      this.router.navigateByUrl('login');
      return false;
    }
    return true;
  }
}
