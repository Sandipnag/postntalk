import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { UtilityService } from '../../Services/utility.service';
import { environment } from '../../../environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm = new FormGroup({
    profileImg: new FormControl(null),
    FirstName: new FormControl(''),
    LastName: new FormControl(''),
    Country: new FormControl(''),
    Gender: new FormControl('0'),
    Mobile: new FormControl('')
  });
  genders: any = ['MALE', 'FEMALE', 'OTHERS'];
  uploadedImage = '../../assets/images/no-img.png';
  uploadedFile = false;
  uploadedImageId = '';
  querySubscription: any;
  constructor(public utilityService: UtilityService,
    private spinner: NgxSpinnerService) { }

  userName:any;
  ngOnInit(): void {
    this.spinner.show();
    const rqstBody = '{"EMAIL":"' + localStorage.getItem('emailId') + '"}';
    this.querySubscription = this.utilityService.callPostApi(environment.getProfileUrl, rqstBody).subscribe(
      (dataValue: any) => {
        // console.log(dataValue);
        if (dataValue.code === '200' && dataValue.status === 'success') {
          this.uploadedFile = true;
          this.uploadedImage = environment.baseURL + dataValue.data.IMAGE_PATH;
          this.uploadedImageId = dataValue.data.IMAGE;
          this.userName = dataValue.data.FIRST_NAME;
          this.profileForm.controls.FirstName.setValue(dataValue.data.FIRST_NAME);
          this.profileForm.controls.LastName.setValue(dataValue.data.LAST_NAME);
          this.profileForm.controls.Country.setValue(dataValue.data.COUNTRY_CODE);
          this.profileForm.controls.Gender.setValue(dataValue.data.GENDER);
          this.profileForm.controls.Mobile.setValue(dataValue.data.MOBILE);
        }
        this.spinner.hide();
      });
  }
  focusFunction(evnt): void {
    const focusedEle = document.getElementById(evnt.target.id) as HTMLInputElement;
    focusedEle.closest('.ar_form_group').classList.add('input_active');
  }

  focusOutFunction(evnt): void {
    const allfocusedEle = document.querySelectorAll('.ar_form_group');
    allfocusedEle.forEach(eachFocusedEle => {
      eachFocusedEle.classList.remove('input_active');
    });
  }

  updateProfile(): void {
    this.spinner.show();
    let userId = localStorage.getItem('userId');
    let rqstBody = {
      "ID": userId,
      "FIRST_NAME": this.profileForm.value.FirstName,
      "LAST_NAME": this.profileForm.value.LastName,
      "GENDER": this.profileForm.value.Gender,
      "COUNTRY_CODE": this.profileForm.value.Country,
      "MOBILE": this.profileForm.value.Mobile,
      "IMAGE": this.uploadedImageId
    };
    this.querySubscription = this.utilityService.callPutApiWithToken(environment.updateProfileUrl, rqstBody).subscribe(
      (dataValue: any) => {
        console.log(dataValue);
        this.spinner.hide();
        if (dataValue.code === '200' && dataValue.status === 'success') {
          Swal.fire({
            text: dataValue.message, icon: 'success', confirmButtonColor: '#00bcd4'
          })
        }
      }, (error: any) => {
        console.log('error');
      });
  }

  onFileChange(event): void {
    const rqstBody = new FormData();
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      rqstBody.append('file', event.target.files[0]);
      reader.onload = () => {
        this.spinner.show();
        let image = reader.result as string;
        this.uploadedImage = image;
        this.utilityService.callPostApiWithToken(environment.fileUploadUrl, rqstBody).subscribe(
          (dataValue: any) => {
            // console.log(dataValue);
            this.spinner.hide();
            if (dataValue.code === '201' && dataValue.status === 'success') {
              this.uploadedFile = true;
              this.uploadedImage = environment.baseURL + dataValue.data.PATH;
              this.uploadedImageId = dataValue.data.ID;
            }
          });
        this.spinner.hide();
      };
    }
  }
}
