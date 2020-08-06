import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilityService } from '../Services/utility.service';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSpinnerComponent } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    emailId: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
    password: new FormControl('', [Validators.required]),
  });
  submitted = false;
  querySubscription: any;

  constructor(public utilityService: UtilityService, private router: Router, private cookieService: CookieService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    if (localStorage.getItem('AccessToken') != null) {
      localStorage.removeItem('AccessToken');
    }
    const IsCookieExists: boolean = this.cookieService.check('AccessToken');
    if (IsCookieExists === true) {
      this.cookieService.delete('AccessToken', '/');
    }
  }

  forgetPassword () {
    this.router.navigateByUrl('/forget-password');
  }

  onSubmit(): void {
    this.submitted = true;
    if (!this.loginForm.invalid) {
      this.spinner.show();
      const rqstBody = '{"EMAIL":"' + this.loginForm.value.emailId + '","PASSWORD":"' + this.loginForm.value.password + '"}';
      this.querySubscription = this.utilityService.callPostApi(environment.loginURL, rqstBody).subscribe(
        (dataValue: any) => {
          console.log(dataValue);
          this.spinner.hide();
          if (dataValue.code === '200' && dataValue.status === 'success') {
            localStorage.setItem('AccessToken', dataValue.data.ACCESS_TOKEN);
            this.cookieService.set('AccessToken', dataValue.data.ACCESS_TOKEN);
            this.router.navigateByUrl('dashboard');
          } else if (dataValue.code === '200' && dataValue.status === 'error') {
            Swal.fire({ text: dataValue.message, icon: 'warning', confirmButtonColor: '#00bcd4' });
          }
          // this.spinner.hide();
        }, (error: any) => {
          console.log('error');
        });
    }
  }

}
