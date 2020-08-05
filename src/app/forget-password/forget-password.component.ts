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

  forgetPasswordForm = new FormGroup({
    emailPhone: new FormControl('', [
      Validators.required, 
      // Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'),
      // Validators.pattern('/^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/')
    ]),
  });
  submitted = false;
  querySubscription: any;
  constructor(public utilityService: UtilityService, private router: Router,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
  }

  

  onSubmit(): void {
    this.submitted = true;
    
    if (!this.forgetPasswordForm.invalid) {
      console.log(this.forgetPasswordForm.value.emailPhone)
      if(this.EMAIL_REGEX.test(this.forgetPasswordForm.value.emailPhone)){
        this.querySubscription = this.utilityService.callPostApi(environment.foregetPassword, {"EMAIL":this.forgetPasswordForm.value.emailPhone,"TYPE":"FORGOT"}).subscribe(
          (dataValue: any) => {
            console.log(dataValue);
            
          }, (error: any) => {
            console.log('error');
          });
      }
      else if(this.PHONE_REGEX.test(this.forgetPasswordForm.value.emailPhone)){

      }else{
        Swal.fire({ text: "Invalid Email or Phone number", icon: 'warning', confirmButtonColor: '#00bcd4' });
      }
      
    }
  }

}
