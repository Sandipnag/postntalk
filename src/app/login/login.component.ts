import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilityService } from '../Services/utility.service';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    emailId: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  submitted = false;
  querySubscription: any;

  constructor(public utilityService: UtilityService, public router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }
    const rqstBody = '{"EMAIL":"' + this.loginForm.value.emailId + '","PASSWORD":"' + this.loginForm.value.password + '"}';
    this.querySubscription = this.utilityService.callPostApi(environment.loginURL, rqstBody).subscribe(
      (dataValue: any) => {
        console.log(dataValue);
        localStorage.setItem('AccessToken', dataValue.data.ACCESS_TOKEN);
        this.router.navigateByUrl('/dashboard');
      }, (error: any) => {
        console.log('error');
      });
  }

  focusFunction(evnt): void {
    let focusedEle = document.getElementById(evnt.target.id) as HTMLInputElement;
    focusedEle.closest('.ar_form_group').classList.add('input_active');
  }

  focusOutFunction(evnt): void {
    const allfocusedEle = document.querySelectorAll('.ar_form_group');
    allfocusedEle.forEach(eachFocusedEle => {
      eachFocusedEle.classList.remove('input_active');
    });
  }

}
