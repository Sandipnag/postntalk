import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { UtilityService } from '../../Services/utility.service';
import { environment } from '../../../environments/environment';
import { dropdownValidation } from '../../Validators/custom.validator';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {

  brandForm = new FormGroup({
    brandImg: new FormControl(null, [Validators.required]),
    selectVertical: new FormControl('0', [Validators.required, dropdownValidation]),
    brandName: new FormControl('', [Validators.required]),
    brandDesc: new FormControl('', [Validators.required]),
  });
  productForm = new FormGroup({
    productImg: new FormControl(null, [Validators.required]),
    selectCategory: new FormControl('0', [Validators.required, dropdownValidation]),
    selectSubCategory: new FormControl('0', [Validators.required, dropdownValidation]),
    productName: new FormControl('', [Validators.required]),
    productDesc: new FormControl('', [Validators.required]),
  });
  baseURL = environment.baseURL;
  allbrands: any;
  verticals: any = [{ id: 'dfhaaazxaas44dfr', name: 'Wine' },
  { id: 'dfhaadr44dfr', name: 'Medicine' },
  { id: 'dfhaamkiuazs44dfr', name: 'Property/Land/Old Products' }];

  constructor(public utilityService: UtilityService, private spinner: NgxSpinnerService) { }
  modalText: string;
  modalBtn: string;
  action: string;
  uploadedImage = '../../assets/images/no-img.png';
  uploadedFile = false;
  uploadedImageId = '';
  selectedVertical: any = this.verticals[0].id;
  status = false;
  brandModalHeader = "Add Brand";
  productModalHeader = "Add Product";
  selectedBrandId;
  selectBrandDetails: any;
  allcategories = [];
  allSubCategory = [];
  searchkey:any
  ngOnInit(): void {
    this.fetchAllBrand();
  }

  openBrandModal(modalType, action): void {
    this.action = action == 'add' ? 'add' : 'edit';
    this.modalBtn = action == 'add' ? 'SAVE' : "Update";
    this.brandModalHeader = action == 'add' ? 'Add Brand' : "Update Brand";
    let brandModal;
    let bodySec = document.getElementById('mainBody');
    this.modalText = 'Add brand';
    brandModal = document.getElementById('ar_sidebar1');
    brandModal.classList.add('visible_ar', 'customFadeIn');
    bodySec.classList.add('overh');
  }

  closeBrandModal(modalType): void {
    this.clearFields(modalType);
    let brandModal;
    let bodySec = document.getElementById('mainBody');
    if (modalType === 'brand') {
      brandModal = document.getElementById('ar_sidebar1');
    } else if (modalType === 'product') {
      brandModal = document.getElementById('ar_sidebar2');
    }
    brandModal.classList.remove('visible_ar', 'customFadeIn');
    bodySec.classList.remove('overh');
  }

  clearFields(modalType): void {
    if (modalType === 'brand') {
      this.brandForm.reset();
      this.brandForm.controls.selectVertical.setValue('0');
      this.uploadedFile = false;
      this.uploadedImage = '../../assets/images/no-img.png';
    } else if (modalType === 'product') {
      this.productForm.reset();
      this.productForm.controls.selectCategory.setValue('0');
      this.productForm.controls.selectSubCategory.setValue('0');
      this.uploadedFile = false;
      this.uploadedImage = '../../assets/images/no-img.png';
    }
  }

  addBrand(): void {
    let rqstBody: any;
    if (this.action === 'add') {
      rqstBody = {
        "NAME": this.brandForm.value.brandName,
        "IMAGE_ID": this.uploadedImageId,
        "DESCRIPTION": this.brandForm.value.brandDesc,
        "VERTICAL_TYPE_ID": this.brandForm.value.selectVertical
      };
      this.utilityService.callPostApiWithToken(environment.addBrandURL, rqstBody).subscribe(
        (dataValue: any) => {
          this.selectedVertical = this.brandForm.value.selectVertical;
          this.spinner.hide();
          if (dataValue.code === '201' && dataValue.status === 'success') {
            Swal.fire({
              text: dataValue.message, icon: 'success', confirmButtonColor: '#00bcd4'
            }).then((result) => {
              if (result.value) {
                this.closeBrandModal('brand');
              }
            });
            this.fetchAllBrand();
          }
        });
    } else if (this.action === 'edit') {
      rqstBody = {
        "NAME": this.brandForm.value.brandName,
        "IMAGE_ID": this.uploadedImageId,
        "DESCRIPTION": this.brandForm.value.brandDesc,
        "STATUS": this.selectBrandDetails.STATUS
      };
      let updateBrandURL = environment.updateBrandURL + this.selectBrandDetails.ID + '?_format=json';
      this.utilityService.callPutApiWithToken(updateBrandURL, rqstBody).subscribe(
        (dataValue: any) => {
          console.log(dataValue);
          this.spinner.hide();
          if (dataValue.code === '200' && dataValue.status === 'success') {
            Swal.fire({
              text: dataValue.message, icon: 'success', confirmButtonColor: '#00bcd4'
            }).then((result) => {
              if (result.value) {
                this.closeBrandModal('brand');
              }
            });
            this.fetchAllBrand();
          }
        });
    }
  }



  fetchAllBrand() {
    this.spinner.show();
    this.utilityService.callPostApiWithToken(`${environment.getAllBrand}`, {
      "filters": {
        "search": [

          {
            "FIELD_NAME": "P_BRAND.VERTICAL_TYPE_ID",
            "FIELD_VALUE": this.verticals[0].id,
            "OPT": "="
          }
        ],

      }
    }).subscribe(
      (dataValue: any) => {
        this.spinner.hide();
        if (dataValue.code === '200' && dataValue.status === 'success') {
          this.allbrands = dataValue.data.DATA;
        }
      });
  }

  changeVertical(event): void {
    this.spinner.show();
    this.utilityService.callPostApiWithToken(`${environment.getAllBrand}`, {
      "filters": {
        "search": [

          {
            "FIELD_NAME": "P_BRAND.VERTICAL_TYPE_ID",
            "FIELD_VALUE": event.target.value,
            "OPT": "="
          }
        ],

      }
    }).subscribe(
      (dataValue: any) => {
        this.spinner.hide();
        if (dataValue.code === '200' && dataValue.status === 'success') {
          this.allbrands = dataValue.data.DATA;
        }
      });
  }

  onKey(event) {
    this.searchkey = event.target.value
  }

  searchBrand() {
    this.spinner.show();
    this.utilityService.callPostApiWithToken(`${environment.getAllBrand}`, {
      "filters": {
        "search": [

          { "FIELD_NAME": "P_BRAND.NAME", "FIELD_VALUE": this.searchkey, "OPT": "LIKE" },
          // { "FIELD_NAME": "P_BRAND.DESCRIPTION", "FIELD_VALUE": this.searchkey, "OPT": "LIKE" },
        ],

      }
    }).subscribe(
      (dataValue: any) => {
        this.spinner.hide();
        if (dataValue.code === '200' && dataValue.status === 'success') {
          this.allbrands = dataValue.data.DATA;
        }
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

  editBrandModal(braindId, modalType): void {
    this.action = 'edit';
    this.modalBtn = 'UPDATE';
    this.spinner.show();
    let getSingleBrandUrl = environment.getSingleBrandURL + braindId + '?_format=json';
    this.utilityService.callGetApiWithToken(getSingleBrandUrl).subscribe(
      (dataValue: any) => {
        this.spinner.hide();
        this.openBrandModal('', 'edit');
        if (dataValue.code === '200' && dataValue.status === 'success') {
          this.selectBrandDetails = dataValue.data;
          this.uploadedFile = true;
          this.uploadedImage = environment.baseURL + this.selectBrandDetails.IMAGE_PATH;
          this.uploadedImageId = this.selectBrandDetails.IMAGE_ID;
          this.brandForm.controls.selectVertical.setValue(this.selectBrandDetails.VERTICAL_TYPE_ID);
          this.brandForm.controls.brandName.setValue(this.selectBrandDetails.NAME);
          this.brandForm.controls.brandDesc.setValue(this.selectBrandDetails.DESCRIPTION);
        }
      });
  }

  changeStatus(brand) {
    this.spinner.show();
    let rqstBody = {
      "NAME": brand.NAME,
      "IMAGE_ID": brand.IMAGE_ID,
      "DESCRIPTION": brand.DESCRIPTION,
      "STATUS": brand.STATUS == 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'
    };
    let updateBrandURL = environment.updateBrandURL + brand.ID + '?_format=json';
    this.utilityService.callPutApiWithToken(updateBrandURL, rqstBody).subscribe(
      (dataValue: any) => {
        this.spinner.hide();
        if (dataValue.code === '200' && dataValue.status === 'success') {
          Swal.fire({
            text: dataValue.message, icon: 'success', confirmButtonColor: '#00bcd4'
          }).then((result) => {
            if (result.value) {
              this.closeBrandModal('brand');
            }
          });
          this.fetchAllBrand();
        }
      });
  }


  // Add Product Section starts

  openProductModal(brandId) {
    this.selectedBrandId = brandId;
    let prodcutModal;
    let bodySec = document.getElementById('mainBody');
    this.productModalHeader = 'Add Product';
    prodcutModal = document.getElementById('ar_sidebar2');
    prodcutModal.classList.add('visible_ar', 'customFadeIn');
    bodySec.classList.add('overh');
    this.fetchAllCategory();
  }

  fetchAllCategory(): void {
    this.spinner.show();
    this.utilityService.callGetApiWithToken(environment.getAllCategory).subscribe(
      (dataValue: any) => {
        this.spinner.hide();
        if (dataValue.code === '200' && dataValue.status === 'success') {
          this.allcategories = dataValue.data;
          // console.log(JSON.stringify(this.allcategories,null,4));
          // this.allSubCategory = [];
          // this.allcategories.forEach(element => {
          //   if (element.SUB_CATEGORY) {
          //     var data = JSON.parse(element.SUB_CATEGORY);
          //     data.forEach((single) => {
          //       this.allSubCategory.push(single);
          //     })
          //   }
          // });

        }
      });
  }

  getSubCategories() {
    let subcategory = JSON.parse(this.allcategories.find((single, index) => {
      return single.ID == this.productForm.value.selectCategory
    }).SUB_CATEGORY);
    this.allSubCategory = subcategory || [];
  }

  addProduct() {
    let rqstBody = {
      "NAME": this.productForm.value.productName,
      "IMAGE_ID": this.uploadedImageId,
      "DESCRIPTION": this.productForm.value.productDesc,
      "SUB_CATEGORY_ID": this.productForm.value.selectSubCategory,
      "CATEGORY_ID": this.productForm.value.selectCategory,
      "BRAND_ID": this.selectedBrandId
    };
    console.log('rqstBody', rqstBody);
    this.spinner.show();
    this.utilityService.callPostApiWithToken(environment.addProductURL, rqstBody).subscribe(
      (dataValue: any) => {

        if (dataValue.code === '201' && dataValue.status === 'success') {
          Swal.fire({
            text: dataValue.message, icon: 'success', confirmButtonColor: '#00bcd4'
          }).then((result) => {
            if (result.value) {
              this.closeBrandModal('product');
            }
          });
          this.fetchAllBrand();
        }
      });
  }

  // Add Product Section ends

}


