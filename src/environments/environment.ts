const BASE_URL =  'http://109.235.69.159:2020/'  ;

export const environment = {
  production: false,
  baseURL: 'http://109.235.69.159:2020/',
  loginURL: BASE_URL+'api/v1/login?_format=json',
  getAllVerticalListingURL: BASE_URL+'api/v1/getAllVerticalType?_format=json',
  getEachVerticalDetailsURL: BASE_URL+'api/v1/getVerticalType/',
  updateEachVerticalURL: BASE_URL+'api/v1/updateVerticalType/',
  fileUploadUrl: BASE_URL+'api/v1/uploadFIle?_format=json',
  addCategoryUrl: BASE_URL+'api/v1/addCategory/?_format=json',
  updateCategoryUrl: BASE_URL+'api/v1/updateCategory/',
  foregetPassword: BASE_URL+'api/v1/forgotPasswordResendActivation?_format=json',
  getAllCategory: BASE_URL+'api/v1/getAllCategory?_format=json',
  getAllCategoryByVertical: BASE_URL+'api/v1/getAllCategory?_format=json&vertical=',
  getSingleCategory: BASE_URL+'api/v1/getCategory/',
  getProfileUrl: BASE_URL+'api/v1/userDetails?_format=json',
  updateProfileUrl: BASE_URL+'api/v1/profileUpdate?_format=json',
  resetPassword: BASE_URL+'api/v1/resetPassword?_format=json',
  setNewPassword: BASE_URL +  'api/v1/forgotPassword?_format=json',
  addBrandURL: BASE_URL +  'api/v1/addBrand?_format=json',
  getAllBrand: BASE_URL +  'api/v1/getAllBrand?_format=json',
  getSingleBrandURL: BASE_URL +  'api/v1/getBrand/',
  updateBrandURL: BASE_URL +  'api/v1/updateBrand/',
  addProductURL: BASE_URL +  'api/v1/addProduct?_format=json',
  getAllProduct: BASE_URL +  'api/v1/getAllProduct?_format=json',
  updateProductUrl: BASE_URL +  'api/v1/updateProduct/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
