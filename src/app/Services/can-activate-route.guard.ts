import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthGuardService } from '../Services/auth-guard.service';

@Injectable({
  providedIn: 'root'
})
export class CanActivateRouteGuard implements CanActivate {
  /*canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }*/
  constructor(private authguardservice: AuthGuardService, private router: Router) { }
  /* canActivate(): boolean {
    if (!this.authguardservice.isAuthenticated()) {
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  } */

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> | boolean {
    return new Promise(resolve => {
      /* this.authguardservice.isAuthenticated()
.then(status: boolean => {
  if(status === false) {
   this.router.navigateByUrl('/login');
  }
  resolve(status);
})
.catch(() => {
 this.router.navigateByUrl('/login');
  resolve(false);
} */
      if (!this.authguardservice.isAuthenticated()) {
        this.router.navigateByUrl('/login');
      }
           )
  }
}

}
