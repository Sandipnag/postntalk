import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilityService } from '../Services/utility.service';
import { environment } from '../../environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {


  private EMAIL_REGEX = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  private PHONE_REGEX = /^\d{10}$/;
  showVerifyOTP = false;
  newPassword = false;
  emailId = '';
  forgetPasswordForm = new FormGroup({
    emailPhone: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'),
      // Validators.pattern('/^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/')
    ]),
    OTP: new FormControl('', [Validators.required]),
    NEWPASSWORD: new FormControl('', [Validators.required])
  });
  submitted = false;
  querySubscription: any;
  constructor(public utilityService: UtilityService, private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
  }



  sendOTP(): void {
    this.submitted = true;
    this.spinner.show();
    if (this.forgetPasswordForm.value.emailPhone !== '') {
      //console.log(this.forgetPasswordForm.value.emailPhone);
      if (this.EMAIL_REGEX.test(this.forgetPasswordForm.value.emailPhone)) {
        this.querySubscription = this.utilityService.callPostApi(environment.foregetPassword, { "EMAIL": this.forgetPasswordForm.value.emailPhone, "TYPE": "FORGOT" }).subscribe(
          (dataValue: any) => {
            console.log(dataValue);
            this.spinner.hide();
            if (dataValue.code === '200' && dataValue.status === 'success') {
              this.emailId = this.forgetPasswordForm.value.emailPhone;
              this.forgetPasswordForm.controls['emailPhone'].disable();
              Swal.fire({
                text: dataValue.message, icon: 'success', confirmButtonColor: '#00bcd4'
              }).then((result) => {
                if (result.value) {
                  this.showVerifyOTP = true;
                }
              });
            } else {
              Swal.fire({
                text: dataValue.message, icon: 'error', confirmButtonColor: '#00bcd4'
              });
            }

          }, (error: any) => {
            console.log('error');
          });
      }
      else if (this.PHONE_REGEX.test(this.forgetPasswordForm.value.emailPhone)) {

      } else {
        Swal.fire({ text: "Invalid Email or Phone number", icon: 'warning', confirmButtonColor: '#00bcd4' });
      }

    }
  }

  verifyOTP(): void {
    this.spinner.show();
    if (!this.forgetPasswordForm.invalid) {
      let rqstBody = {
        "EMAIL": this.emailId,
        "TOKEN": this.forgetPasswordForm.value.OTP,
        "PASSWORD": this.forgetPasswordForm.value.NEWPASSWORD
      };
      console.log(rqstBody);
      this.querySubscription = this.utilityService.callPutApi(environment.setNewPassword, rqstBody).subscribe(
        (dataValue: any) => {
          this.spinner.hide();
          if (dataValue.code === '200' && dataValue.status === 'success') {
            Swal.fire({
              text: dataValue.message, icon: 'success', confirmButtonColor: '#00bcd4'
            }).then((result) => {
              if (result.value) {
                this.router.navigateByUrl('login');
              }
            });
          } else {
            Swal.fire({
              text: dataValue.message, icon: 'error', confirmButtonColor: '#00bcd4'
            });
          }
        }, (error: any) => {
          console.log('error');
        });
    }
  }

}
