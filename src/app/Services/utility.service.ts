import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private httpClient: HttpClient) {
  }

  callPostApi(postUrl: string, requestBody: any): Observable<any> {
    const res = this.httpClient.post<any>(postUrl, requestBody, this.httpOptions);
    return res;
  }

  callGetApiWithToken(getUrl: string): Observable<any> {
    const authToken = localStorage.getItem('AccessToken');
    const httpOtionsWithToken = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${authToken}`
      })
    };
    const res = this.httpClient.get<any>(getUrl, httpOtionsWithToken);
    return res;
  }

  callPutApiWithToken(putUrl: string, requestBody: any): Observable<any> {
    const authToken = localStorage.getItem('AccessToken');
    const httpOtionsWithToken = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${authToken}`
      })
    };
    const res = this.httpClient.put<any>(putUrl, requestBody, httpOtionsWithToken);
    return res;
  }
  callPostApiWithToken(postUrl: string, requestBody: any): Observable<any> {
    const authToken = localStorage.getItem('AccessToken');
    const httpOtionsWithToken = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${authToken}`
      })
    };
    const res = this.httpClient.post<any>(postUrl, requestBody, httpOtionsWithToken);
    return res;
  }
}
