import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { UtilityService } from '../../Services/utility.service';
import { environment } from '../../../environments/environment';
import { dropdownValidation } from '../../Validators/custom.validator';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  baseURL = environment.baseURL;
  productForm = new FormGroup({
    productImg: new FormControl(null, [Validators.required]),
    selectedBrandId: new FormControl('0', [Validators.required, dropdownValidation]),
    selectVertical: new FormControl('0', [Validators.required, dropdownValidation]),
    selectCategory: new FormControl('0', [Validators.required, dropdownValidation]),
    selectSubCategory: new FormControl('0', [Validators.required, dropdownValidation]),
    productName: new FormControl('', [Validators.required]),
    productDesc: new FormControl('', [Validators.required]),
  });
  productModalHeader: any;
  allbrands: any;
  allcategories = [];
  allProducts = [];
  allSubCategory = [];
  uploadedImage = '../../assets/images/no-img.png';
  uploadedFile = false;
  uploadedImageId = '';
  selectedVertical: any;
  querySubscription: any;
  allVerticalTypes: object[];
  action: any;
  modalBtn: any;
  searchkey: any;
  constructor(public utilityService: UtilityService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.fetchAllProduct();
  }

  fetchAllProduct() {
    this.spinner.show();
    this.utilityService.callPostApiWithToken(`${environment.getAllProduct}`, {}).subscribe(
      (dataValue: any) => {
        this.spinner.hide();
        if (dataValue.code === '200' && dataValue.status === 'success') {
          this.allProducts = dataValue.data.DATA;
        }
      });
  }

  openProductModal(type) {
    this.action = type;
    this.modalBtn = type == 'add' ? 'Add Product' : 'Update Product'
    let prodcutModal;
    let bodySec = document.getElementById('mainBody');
    this.productModalHeader = type == 'add' ? 'Add Product' : 'Update Product';
    prodcutModal = document.getElementById('ar_sidebar2');
    prodcutModal.classList.add('visible_ar', 'customFadeIn');
    bodySec.classList.add('overh');
    this.getAllVerticalTypes();
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

  getAllVerticalTypes(): void {
    this.querySubscription = this.utilityService.callGetApiWithToken(environment.getAllVerticalListingURL).subscribe(
      (dataValue: any) => {
        if (dataValue.code === '200' && dataValue.status === 'success') {
          this.allVerticalTypes = dataValue.data;
        }
      }, (error: any) => {
        console.log('error');
      });
  }
  onVerticalChange() {
    this.fetchAllCategory();
    this.fetchAllBrand();
  }
  fetchAllCategory(): void {
    let verticalId = this.productForm.value.selectVertical || 0;
    this.spinner.show();
    this.utilityService.callGetApiWithToken(environment.getAllCategory).subscribe(
      (dataValue: any) => {
        this.spinner.hide();
        if (dataValue.code === '200' && dataValue.status === 'success') {
          this.allcategories = dataValue.data;
          this.allcategories = this.allcategories.filter((category, id) => {
            return category.VERTICAL_TYPE_ID == verticalId
          })
        }
      });
  }

  getSubCategories() {
    let subcategory = JSON.parse(this.allcategories.find((single, index) => {
      return single.ID == this.productForm.value.selectCategory
    }).SUB_CATEGORY);
    this.allSubCategory = subcategory || [];
  }

  fetchAllBrand() {
    let verticalId = this.productForm.value.selectVertical || 0;
    this.spinner.show();
    this.utilityService.callPostApiWithToken(`${environment.getAllBrand}`, {
      "filters": {
        "search": [

          {
            "FIELD_NAME": "P_BRAND.VERTICAL_TYPE_ID",
            "FIELD_VALUE": verticalId,
            "OPT": "="
          }
        ],

      }
    }).subscribe(
      (dataValue: any) => {
        this.spinner.hide();
        if (dataValue.code === '200' && dataValue.status === 'success') {
          this.allbrands = dataValue.data.DATA;
          console.log(this.allbrands)
        }
      });
  }

  addProduct() {
    this.spinner.show();
    let rqstBody = {
      "NAME": this.productForm.value.productName,
      "IMAGE_ID": this.uploadedImageId,
      "DESCRIPTION": this.productForm.value.productDesc,
      "SUB_CATEGORY_ID": this.productForm.value.selectSubCategory,
      "CATEGORY_ID": this.productForm.value.selectCategory,
      "BRAND_ID": this.productForm.value.selectedBrandId
    };
    console.log('rqstBody', rqstBody);
    console.log('this.action', this.action);
    if (this.action == 'add') {
      this.utilityService.callPostApiWithToken(environment.addProductURL, rqstBody).subscribe(
        (dataValue: any) => {
          this.spinner.hide();
          console.log('this.action', dataValue);
          if (dataValue.code === '201' && dataValue.status === 'success') {
            Swal.fire({
              text: dataValue.message, icon: 'success', confirmButtonColor: '#00bcd4'
            }).then((result) => {
              if (result.value) {
                this.closeModal('product');
              }
            });
            this.fetchAllProduct();
          }
        });
    } else if (this.action == 'edit') {

    }
  }

  closeModal(modalType): void {
    this.clearFields(modalType);
    let brandModal;
    let bodySec = document.getElementById('mainBody');
    if (modalType === 'product') {
      brandModal = document.getElementById('ar_sidebar2');
    }
    brandModal.classList.remove('visible_ar', 'customFadeIn');
    bodySec.classList.remove('overh');
  }

  clearFields(modalType): void {
    if (modalType === 'product') {
      this.productForm.reset();
      this.productForm.controls.selectVertical.setValue('0');
      this.productForm.controls.selectedBrandId.setValue('0');
      this.productForm.controls.selectCategory.setValue('0');
      this.productForm.controls.selectSubCategory.setValue('0');
      this.uploadedFile = false;
      this.uploadedImage = '../../assets/images/no-img.png';
    }
  }

  editProductModal(product): void {
    console.log('brand', JSON.stringify(product, null, 4))
    this.action = 'edit';
    this.openProductModal(this.action);
    // this.spinner.show();
    this.uploadedFile = true;
    this.uploadedImage = environment.baseURL + product.IMAGE_PATH;
    this.uploadedImageId = product.IMAGE_ID;
    this.productForm.controls.selectVertical.setValue(product.VERTICAL_TYPE_ID);
    this.productForm.controls.selectCategory.setValue(product.CATEGORY_ID);
    this.productForm.controls.selectSubCategory.setValue(product.SUB_CATEGORY_ID);
    this.productForm.controls.selectedBrandId.setValue(product.BRAND_ID);
    this.productForm.controls.productName.setValue(product.NAME);
    this.productForm.controls.productDesc.setValue(product.DESCRIPTION);
  }

  onKey(event) {
    this.searchkey = event.target.value
  }

  searchProduct() {
    this.spinner.show();
    this.utilityService.callPostApiWithToken(`${environment.getAllProduct}`, {
      "filters": {
        "search": [
          {
            "FIELD_NAME": "P_PRODUCT.NAME",
            "FIELD_VALUE": this.searchkey,
            "OPT": "LIKE"
          }
        ]
      }
    }).subscribe(
      (dataValue: any) => {
        this.spinner.hide();
        if (dataValue.code === '200' && dataValue.status === 'success') {
          this.allProducts = dataValue.data.DATA;
        }
      });
  }
  changeStatus(product) {
    this.spinner.show();
    let rqstBody = {
      "NAME": product.NAME,
      "IMAGE_ID": product.IMAGE_ID,
      "DESCRIPTION": product.DESCRIPTION,
      "STATUS": product.STATUS == 'ACTIVE' ? 'INACTIVE' : 'ACTIVE',
      "BRAND_ID": product.BRAND_ID,
      "SUB_CATEGORY_ID": product.SUB_CATEGORY_ID,
      "CATEGORY_ID": product.CATEGORY_ID,
    };
    let updateProductUrl = environment.updateProductUrl + product.ID + '?_format=json';
    this.utilityService.callPutApiWithToken(updateProductUrl, rqstBody).subscribe(
      (dataValue: any) => {
        this.spinner.hide();
        if (dataValue.code === '200' && dataValue.status === 'success') {
          Swal.fire({
            text: dataValue.message, icon: 'success', confirmButtonColor: '#00bcd4'
          })
          this.fetchAllProduct();
        }
      });
  }

}
