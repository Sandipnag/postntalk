import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { UtilityService } from '../../Services/utility.service';
import { environment } from '../../../environments/environment';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {

  constructor(public utilityService: UtilityService, private spinner: NgxSpinnerService) { }

  resetPasswordForm = new FormGroup({
    OldPassword: new FormControl(''),
    NewPassword: new FormControl(''),
  });
  querySubscription: any;
  submitted = false;
  ngOnInit(): void {

  }

  updatePassword(): void {
    this.submitted = true;
    if (!this.resetPasswordForm.invalid) {
      this.spinner.show();
      let userId = localStorage.getItem('userId');
      let rqstBody = {
        "ID": userId,
        "PASSWORD": this.resetPasswordForm.value.NewPassword,
        "CURRENT_PASSWORD": this.resetPasswordForm.value.OldPassword
      };
      console.log(rqstBody)
      this.querySubscription = this.utilityService.callPutApiWithToken(environment.resetPassword, rqstBody).subscribe(
        (dataValue: any) => {
          console.log(dataValue);
          this.spinner.hide();
          if (dataValue.code === '200' && dataValue.status === 'success') {
            Swal.fire({
              text: dataValue.message, icon: 'success', confirmButtonColor: '#00bcd4'
            })
          }else{
            Swal.fire({
              text: dataValue.message, icon: 'error', confirmButtonColor: '#F27474'
            })
          }
        }, (error: any) => {
          console.log('error');
        });
    }
  }

}
