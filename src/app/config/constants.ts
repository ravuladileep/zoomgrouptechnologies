// defining the message constant
// tslint:disable-next-line: no-namespace
export namespace CommonConstants {
  export const ERROR_MSG_409 = 'Currently data sync in progress. Please try after some time.';
  export const ERROR_MSG_401 = 'Your session has expired. Please login back in again';
  export const ERROR_MSG_500 = 'Opps something went wrong! Our engineer is aware of it. Please check back shortly.';
  export const INTERNAL_SERVER_ERROR = 'Internal Server Error!';
  export const CONTACT_ADD_MSG = 'We\'ve created your contact! You will now be directed to their record.';
  export const COMMON_ERR_MSG = 'Some thing went wrong. Please try again later';
  export const COMMON_ERR_MSG_1 = 'Permission Denied';
  export const REMOVE_APP = 'We\'ve cleared your application.';
  export const API_TIME_DURATION = 10000; // in millisecond

  export function jsons() {
    return JSON.stringify;
  }

  export function jsonp() {
    return JSON.parse;
  }

  export function getTodayDate() {
    return new Date();
  }

  export function getItem(key: string) {
    return localStorage.getItem(key);
  }

  export function removeItem(key: string) {
    return localStorage.removeItem(key);
  }

  export function setItem(key: string, value: string) {
    return localStorage.setItem(key, value);
  }

  export function getToken() {
    return localStorage.getItem('token');
  }

  export function setToken(value: string) {
    return localStorage.setItem('token', value);
  }

  export function removeToken() {
    return localStorage.removeItem('token');
  }

  export function clearLocalStorage() {
    return localStorage.clear();
  }
}
