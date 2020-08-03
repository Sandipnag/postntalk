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
  constructor(private httpClient: HttpClient) { }
  callGetApi(getUrl: string): Observable<any> {
    const res = this.httpClient.get<any>(getUrl, this.httpOptions);
    return res;
  }
  callPostApi(postUrl: string, requestBody: any): Observable<any> {
    const res = this.httpClient.post<any>(postUrl, requestBody, this.httpOptions);
    return res;
  }
}
