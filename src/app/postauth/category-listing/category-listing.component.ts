import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSpinnerComponent } from 'ngx-spinner';
import { UtilityService } from '../../Services/utility.service';
import { environment } from '../../../environments/environment';
import { dropdownValidation } from '../../Validators/custom.validator';

declare var $: any;

@Component({
  selector: 'app-category-listing',
  templateUrl: './category-listing.component.html',
  styleUrls: ['./category-listing.component.scss']
})
export class CategoryListingComponent implements OnInit {
  categoryForm = new FormGroup({
    categoryImg: new FormControl(null, [Validators.required]),
    selectVertical: new FormControl('0', [Validators.required, dropdownValidation]),
    categoryName: new FormControl('', [Validators.required]),
    categoryDesc: new FormControl('', [Validators.required]),
  });
  subCategoryForm = new FormGroup({
    subCategoryImg: new FormControl(null, [Validators.required]),
    subCategoryName: new FormControl('', [Validators.required]),
    subCategoryDesc: new FormControl('', [Validators.required]),
  });
  verticals: any = [{ id: 'dfhaaazxaas44dfr', name: 'Wine' },
  { id: 'dfhaadr44dfr', name: 'Medicine' },
  { id: 'dfhaamkiuazs44dfr', name: 'Property/Land/Old Products' }];

  categorySubmitted = false;
  uploadedImage = '../../assets/images/no-img.png';
  uploadedFile = false;
  uploadedImageId = '';
  /* chooseVertical = new FormControl('0', [dropdownValidation]); */
  constructor(public utilityService: UtilityService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    $('.custom_category_table > tbody>  tr').on('click', function () {
      alert('table');
      $(this).next().children('td').toggle();
    });
    $('[data-sidebar]').on('click', function () {
      const targetElem = $(this).attr('data-sidebar');
      $(targetElem).fadeIn().addClass('visible_ar');
      $('body').addClass('overh');
    });
    $('.cust_close').on('click', function () {
      $(this).closest('.custom_side_slide').fadeOut().removeClass('visible_ar');
      $('body').removeClass('overh');
    });
    $('.custom_side_slide').on('click', function () {
      $(this).fadeOut().removeClass('visible_ar');
      $('body').removeClass('overh');
    });
    $('.ar_side_slide_inr').on('click', function (e) {
      e.stopPropagation();
    });
  }

  openCatModal(): void {
    this.uploadedFile = false;
    this.uploadedImage = '../../assets/images/no-img.png';
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
            console.log(dataValue);
            this.spinner.hide();
            if (dataValue.code === '201' && dataValue.status === 'success') {
              this.uploadedFile = true;
              this.uploadedImage = environment.baseURL + dataValue.data.PATH;
              this.uploadedImageId = dataValue.data.ID;
            }
          });
      };
    }
  }

  addCategory(typeCat): void {
    let rqstBody: any;
    if (typeCat === 'cat') {
      /* let subCategory = '[{ "NAME": "", "DESCRIPTION": "" }]'; */
      let subCategory = [];
      /* rqstBody = '{"NAME":"' + this.categoryForm.value.categoryName +
         '","IMAGE_ID:"' + this.uploadedImageId +
         '","DESCRIPTION":"' + this.categoryForm.value.categoryDesc +
         '","VERTICAL_TYPE_ID":"' + this.categoryForm.value.selectVertical +
         '","SUB_CATEGORIES":' + [] + '}'; */

      rqstBody = {
        "NAME": this.categoryForm.value.categoryName,
        "IMAGE_ID": this.uploadedImageId,
        "DESCRIPTION": this.categoryForm.value.categoryDesc,
        "VERTICAL_TYPE_ID": this.categoryForm.value.selectVertical,
        "SUB_CATEGORIES": []
      };

      console.log(rqstBody);
    } else if (typeCat === 'subCat') {
      /* rqstBody = '{"NAME":"' + this.categoryForm.value.categoryName + '","IMAGE_ID:"' + this.uploadedImageId + '","DESCRIPTION":"' + this.categoryForm.value.categoryDesc + '","VERTICAL_TYPE_ID":"' + this.categoryForm.value.selectVertical + '","SUB_CATEGORIES":' +  + '}'; */
    }

    this.utilityService.callPostApiWithToken(environment.addCategoryUrl, rqstBody).subscribe(
      (dataValue: any) => {
        console.log(dataValue);
        this.spinner.hide();
        /* if (dataValue.code === '201' && dataValue.status === 'success') {
           this.uploadedFile = true;
           this.uploadedImage = environment.baseURL + dataValue.data.PATH;
         } */
      });
  }

  changeVertical(evt): void {

  }
}
