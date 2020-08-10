// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseURL: 'http://109.235.69.159:2020/',
  loginURL: 'http://109.235.69.159:2020/api/v1/login?_format=json',
  getAllVerticalListingURL: 'http://109.235.69.159:2020/api/v1/getAllVerticalType?_format=json',
  getEachVerticalDetailsURL: 'http://109.235.69.159:2020/api/v1/getVerticalType/',
  updateEachVerticalURL: 'http://109.235.69.159:2020/api/v1/updateVerticalType/',
  fileUploadUrl: 'http://109.235.69.159:2020/api/v1/uploadFIle?_format=json',
  addCategoryUrl: 'http://109.235.69.159:2020/api/v1/addCategory/?_format=json',
  updateCategoryUrl: 'http://109.235.69.159:2020/api/v1/updateCategory/',
  foregetPassword: 'http://109.235.69.159:2020/api/v1/forgotPasswordResendActivation?_format=json',
  getAllCategory: 'http://109.235.69.159:2020/api/v1/getAllCategory?_format=json',
  getAllCategoryByVertical: 'http://109.235.69.159:2020/api/v1/getAllCategory?_format=json&vertical=',
  getSingleCategory: 'http://109.235.69.159:2020/api/v1/getCategory/',
  getProfileUrl: 'http://109.235.69.159:2020/api/v1/userDetails?_format=json',
  updateProfileUrl: 'http://109.235.69.159:2020/api/v1/profileUpdate?_format=json'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
