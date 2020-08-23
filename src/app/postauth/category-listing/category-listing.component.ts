import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { UtilityService } from '../../Services/utility.service';
import { environment } from '../../../environments/environment';
import { dropdownValidation } from '../../Validators/custom.validator';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-category-listing',
  templateUrl: './category-listing.component.html',
  styleUrls: ['./category-listing.component.scss']
})
export class CategoryListingComponent implements OnInit {
  allSubCategory: any = [];
  allcategories: any;
  selectCatDetails: any;
  selectSubCatDetails: any;
  modalText: string;
  modalBtn: string;
  action: string;
  categoryForm = new FormGroup({
    categoryImg: new FormControl(null, [Validators.required]),
    selectVertical: new FormControl('0', [Validators.required, dropdownValidation]),
    categoryName: new FormControl('', [Validators.required]),
    categoryDesc: new FormControl('', [Validators.required]),
  });
  subCategoryForm = new FormGroup({
    //  subCategoryImg: new FormControl(null, [Validators.required]),
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
    /*$(document).ready(function () {
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
    }); */
    this.fetchAllCategory();
  }
  selectedVertical:any = this.verticals[0].id;
  subCatSecShow(clickedCat, clickedSubCat, evt): void {
    // console.log(evt);
    if (evt.target.tagName !== 'A') {
      let clickedCatRow = document.getElementById(clickedCat);
      let clickedSubCatRow = document.getElementById(clickedSubCat);
      if (clickedSubCatRow !== null && clickedSubCatRow !== undefined) {
        clickedCatRow.classList.toggle('table_collapse');
        clickedSubCatRow.classList.toggle('collapse_item');
      }
    }
  }

  openCatModal(catId, modalType): void {
    this.action = 'add';
    this.modalBtn = 'SAVE';
    let catModal;
    let bodySec = document.getElementById('mainBody');
    if (modalType === 'cat') {
      this.modalText = 'Add Category';
      catModal = document.getElementById('ar_sidebar1');
    } else {
      this.modalText = 'Add Sub Category';
      catModal = document.getElementById('ar_sidebar2');
      this.getSingleCat(catId);
    }
    catModal.classList.add('visible_ar', 'customFadeIn');
    bodySec.classList.add('overh');
  }

  clearFields(modalType): void {
    if (modalType === 'cat') {
      this.categoryForm.reset();
      this.categoryForm.controls.selectVertical.setValue('0');
      this.uploadedFile = false;
      this.uploadedImage = '../../assets/images/no-img.png';
    } else {
      this.subCategoryForm.reset();
    }
  }

  addCategory(): void {
    let rqstBody: any;
    if (this.action === 'add') {
      rqstBody = {
        "NAME": this.categoryForm.value.categoryName,
        "IMAGE_ID": this.uploadedImageId,
        "DESCRIPTION": this.categoryForm.value.categoryDesc,
        "VERTICAL_TYPE_ID": this.categoryForm.value.selectVertical,
        "SUB_CATEGORIES": []
      };
      this.utilityService.callPostApiWithToken(environment.addCategoryUrl, rqstBody).subscribe(
        (dataValue: any) => {
           console.log(dataValue);
          this.selectedVertical = this.categoryForm.value.selectVertical;
          this.spinner.hide();
          if (dataValue.code === '201' && dataValue.status === 'success') {
            Swal.fire({
              text: dataValue.message, icon: 'success', confirmButtonColor: '#00bcd4'
            }).then((result) => {
              if (result.value) {
                this.closeCatModal('cat');
              }
            });
            this.fetchAllCategory();
          }
        });
    } else if (this.action === 'edit') {
      let subcatArray = [];
      let subCategories = {
        ID: '', NAME: '', DESCRIPTION: '', STATUS: ''
      };
      if (this.selectCatDetails.SUB_CATEGORIES.length !== 0) {
        this.selectCatDetails.SUB_CATEGORIES.map(eachSubcat => {
          subCategories.ID = eachSubcat.ID;
          subCategories.NAME = eachSubcat.NAME;
          subCategories.DESCRIPTION = eachSubcat.DESCRIPTION;
          subCategories.STATUS = eachSubcat.STATUS;
          subcatArray.push(subCategories);
        });
      }
      rqstBody = {
        "NAME": this.categoryForm.value.categoryName,
        "IMAGE_ID": this.uploadedImageId,
        "DESCRIPTION": this.categoryForm.value.categoryDesc,
        "STATUS": "ACTIVE",
        "SUB_CATEGORIES": subcatArray
      };
      let updateCategoryURL = environment.updateCategoryUrl + this.selectCatDetails.ID + '?_format=json';
      this.utilityService.callPutApiWithToken(updateCategoryURL, rqstBody).subscribe(
        (dataValue: any) => {
          // console.log(dataValue);
          this.spinner.hide();
          if (dataValue.code === '200' && dataValue.status === 'success') {
            Swal.fire({
              text: dataValue.message, icon: 'success', confirmButtonColor: '#00bcd4'
            }).then((result) => {
              if (result.value) {
                this.closeCatModal('cat');
              }
            });
            this.fetchAllCategory();
          }
        });
    }
  }

  addSubCategory(): void {
    let rqstBody: any;
    let subCatObj: any;
    if (this.action === 'add') {
      subCatObj = {
        "NAME": this.subCategoryForm.value.subCategoryName,
        "DESCRIPTION": this.subCategoryForm.value.subCategoryDesc
      };
      rqstBody = {
        "NAME": this.selectCatDetails.NAME,
        "IMAGE_ID": this.selectCatDetails.IMAGE_ID,
        "DESCRIPTION": this.selectCatDetails.DESCRIPTION,
        "STATUS": "ACTIVE",
        "SUB_CATEGORIES": []
      };
      rqstBody.SUB_CATEGORIES.push(subCatObj);
    } else if (this.action === 'edit') {
      subCatObj = {
        "ID": this.selectSubCatDetails[0].ID,
        "NAME": this.subCategoryForm.value.subCategoryName,
        "DESCRIPTION": this.subCategoryForm.value.subCategoryDesc,
        "STATUS": "ACTIVE"
      };
      rqstBody = {
        "NAME": this.selectCatDetails.NAME,
        "IMAGE_ID": this.selectCatDetails.IMAGE_ID,
        "DESCRIPTION": this.selectCatDetails.DESCRIPTION,
        "STATUS": "ACTIVE",
        "SUB_CATEGORIES": []
      };
      rqstBody.SUB_CATEGORIES.push(subCatObj);
    }
    console.log(rqstBody);
    let updateCategoryURL = environment.updateCategoryUrl + this.selectCatDetails.ID + '?_format=json';
    this.utilityService.callPutApiWithToken(updateCategoryURL, rqstBody).subscribe(
      (dataValue: any) => {
        // console.log(dataValue);
        this.spinner.hide();
        if (dataValue.code === '200' && dataValue.status === 'success') {
          Swal.fire({
            text: dataValue.message, icon: 'success', confirmButtonColor: '#00bcd4'
          }).then((result) => {
            if (result.value) {
              this.closeCatModal('subcat');
            }
          });
          this.fetchAllCategory();
        }
      });
  }

  editCatModal(catId, subcatId, modalType): void {
    this.action = 'edit';
    this.modalBtn = 'UPDATE';
    let getSingleCategoryUrl = environment.getSingleCategory + catId + '?_format=json';
    this.utilityService.callGetApiWithToken(getSingleCategoryUrl).subscribe(
      (dataValue: any) => {
        this.spinner.hide();
        if (dataValue.code === '200' && dataValue.status === 'success') {
          this.selectCatDetails = dataValue.data;
          console.log(this.selectCatDetails);
          let catModal;
          let bodySec = document.getElementById('mainBody');
          if (modalType === 'cat') {
            catModal = document.getElementById('ar_sidebar1');
            this.modalText = 'Edit Category';
            this.uploadedFile = true;
            this.uploadedImage = environment.baseURL + this.selectCatDetails.IMAGE_PATH;
            this.uploadedImageId = this.selectCatDetails.IMAGE_ID;
            this.categoryForm.controls.selectVertical.setValue(this.selectCatDetails.VERTICAL_TYPE_ID);
            this.categoryForm.controls.categoryName.setValue(this.selectCatDetails.NAME);
            this.categoryForm.controls.categoryDesc.setValue(this.selectCatDetails.DESCRIPTION);
          } else {
            this.modalText = 'Edit Sub Category';
            catModal = document.getElementById('ar_sidebar2');
            this.selectSubCatDetails = this.selectCatDetails.SUB_CATEGORIES.filter(item =>
              item.ID === subcatId
            );
            this.subCategoryForm.controls.subCategoryName.setValue(this.selectSubCatDetails[0].NAME);
            this.subCategoryForm.controls.subCategoryDesc.setValue(this.selectSubCatDetails[0].DESCRIPTION);
          }
          catModal.classList.add('visible_ar', 'customFadeIn');
          bodySec.classList.add('overh');
        }
      });
  }

  getSingleCat(catId): void {
    let getSingleCategoryUrl = environment.getSingleCategory + catId + '?_format=json';
    this.utilityService.callGetApiWithToken(getSingleCategoryUrl).subscribe(
      (dataValue: any) => {
        this.spinner.hide();
        if (dataValue.code === '200' && dataValue.status === 'success') {
          this.selectCatDetails = dataValue.data;
          //console.log(this.selectCatDetails);
        }
      });
  }

  closeCatModal(modalType): void {
    this.clearFields(modalType);
    let catModal;
    let bodySec = document.getElementById('mainBody');
    if (modalType === 'cat') {
      catModal = document.getElementById('ar_sidebar1');
    } else {
      catModal = document.getElementById('ar_sidebar2');
    }
    catModal.classList.remove('visible_ar', 'customFadeIn');
    bodySec.classList.remove('overh');
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

  fetchAllCategory(): void {
    this.spinner.show();
    this.utilityService.callGetApiWithToken(environment.getAllCategoryByVertical+this.selectedVertical).subscribe(
      (dataValue: any) => {
        // console.log(dataValue);
        this.spinner.hide();
        if (dataValue.code === '200' && dataValue.status === 'success') {
          this.allcategories = dataValue.data;
          
          this.allSubCategory = [];
          this.allcategories.forEach(element => {
            this.allSubCategory.push(JSON.parse(element.SUB_CATEGORY));
          });
          console.log(this.allSubCategory);
        }
      });
  }
  changeVertical(event): void {
    this.spinner.show();
    this.utilityService.callGetApiWithToken(environment.getAllCategoryByVertical+event.target.value).subscribe(
      (dataValue: any) => {
        // console.log(dataValue);
        this.spinner.hide();
        if (dataValue.code === '200' && dataValue.status === 'success') {
          this.allcategories = dataValue.data;
          // console.log(this.allcategories);
          this.allSubCategory = [];
          this.allcategories.forEach(element => {
            this.allSubCategory.push(JSON.parse(element.SUB_CATEGORY));
          });
          // console.log(this.allSubCategory);
        }
      });
  }
}
