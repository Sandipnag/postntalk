import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilityService } from '../../Services/utility.service';
import { environment } from '../../../environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSpinnerComponent } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vertical-listing',
  templateUrl: './vertical-listing.component.html',
  styleUrls: ['./vertical-listing.component.scss']
})
export class VerticalListingComponent implements OnInit {
  wineForm = new FormGroup({
    wineKyc: new FormControl(''),
    wineOverEighteen: new FormControl(''),
    wineMinOrder: new FormControl('', [Validators.required]),
    wineMaxOrder: new FormControl('', [Validators.required]),
  });
  medForm = new FormGroup({
    medKyc: new FormControl(''),
    medMinOrder: new FormControl('', [Validators.required]),
    medMaxOrder: new FormControl('', [Validators.required]),
  });
  landForm = new FormGroup({
    landKyc: new FormControl(''),
    commission: new FormControl('', [Validators.required])
  });
  wineSubmitted = false;
  medSubmitted = false;
  landSubmitted = false;
  querySubscription: any;
  allVerticalTypes: object[];
  constructor(public utilityService: UtilityService, private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.getAllVerticalTypes();
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

  togglePanel(verticalId): void {
    const selectVertical = document.getElementById(verticalId) as HTMLInputElement;
    if (!selectVertical.classList.contains('show')) {
      this.getEachVerticalTypeDetails(verticalId);
    }
    const allVerticals = document.querySelectorAll('.eachVertical');
    allVerticals.forEach(eachVertical => {
      if (eachVertical === selectVertical) {
        selectVertical.classList.toggle('show');
      }
      else {
        eachVertical.classList.remove('show');
      }
    });
  }

  getAllVerticalTypes(): void {
    this.querySubscription = this.utilityService.callGetApiWithToken(environment.getAllVerticalListingURL).subscribe(
      (dataValue: any) => {
        if (dataValue.code === '200' && dataValue.status === 'success') {
          this.allVerticalTypes = dataValue.data;
          console.log(this.allVerticalTypes);
          this.getEachVerticalTypeDetails('dfhaaazxaas44dfr');
        }
        // this.spinner.hide();
      }, (error: any) => {
        console.log('error');
      });
  }

  getEachVerticalTypeDetails(verticalId): void {
    this.spinner.show();
    const getEachVerticalUrl = environment.getEachVerticalDetailsURL + verticalId + '?_format=json';
    this.querySubscription = this.utilityService.callGetApiWithToken(getEachVerticalUrl).subscribe(
      (dataValue: any) => {
        console.log(dataValue);
        if (dataValue.code === '200' && dataValue.status === 'success') {
          const eachVerticalDetail = JSON.parse(dataValue.data.CONFIG);
          switch (verticalId) {
            case 'dfhaaazxaas44dfr':
              this.wineForm.patchValue({
                wineKyc: eachVerticalDetail.kyc_status,
                wineOverEighteen: eachVerticalDetail.over_eighteen,
                wineMinOrder: eachVerticalDetail.minimum_order,
                wineMaxOrder: eachVerticalDetail.maximum_order
              });
              break;

            case 'dfhaadr44dfr':
              this.medForm.patchValue({
                medKyc: eachVerticalDetail.kyc_status,
                medMinOrder: eachVerticalDetail.minimum_order,
                medMaxOrder: eachVerticalDetail.maximum_order
              });
              break;
            case 'dfhaamkiuazs44dfr':
              this.landForm.patchValue({
                landKyc: eachVerticalDetail.kyc_status,
                commission: eachVerticalDetail.commission_rate,
              });
              break;

            default:
              break;
          }
        }
        this.spinner.hide();
      }, (error: any) => {
        console.log('error');
      });
  }

  updateEachVerticalDetails(verticalId): void {
    this.spinner.show();
    let verticalConfig = {};
    switch (verticalId) {
      case 'dfhaaazxaas44dfr':
        if (this.wineForm.invalid) {
          return;
        }
        verticalConfig = {
          minimum_order: this.wineForm.value.wineMinOrder,
          maximum_order: this.wineForm.value.wineMaxOrder,
          kyc_status: this.wineForm.value.wineKyc,
          over_eighteen: this.wineForm.value.wineOverEighteen
        };
        break;
      case 'dfhaadr44dfr':
        if (this.medForm.invalid) {
          return;
        }
        verticalConfig = {
          minimum_order: this.medForm.value.medMinOrder,
          maximum_order: this.medForm.value.medMaxOrder,
          kyc_status: this.medForm.value.medKyc,
        };
        break;
      case 'dfhaamkiuazs44dfr':
        if (this.landForm.invalid) {
          return;
        }
        verticalConfig = {
          kyc_status: this.landForm.value.landKyc,
          commission_rate: this.landForm.value.commission
        };
        break;
      default:
        break;
    }
    const updateEachVertical = environment.updateEachVerticalURL + verticalId + '?_format=json';
    const rqstBody = { CONFIG: verticalConfig };
    console.log(rqstBody);
    this.querySubscription = this.utilityService.callPutApiWithToken(updateEachVertical, rqstBody).subscribe(
      (dataValue: any) => {
        console.log(dataValue);
        if (dataValue.code === '201' && dataValue.status === 'success') {
          Swal.fire({
            text: dataValue.message, icon: 'success', confirmButtonColor: '#00bcd4'
          });
        }
        this.spinner.hide();
      }, (error: any) => {
        console.log('error');
      });
  }
}
