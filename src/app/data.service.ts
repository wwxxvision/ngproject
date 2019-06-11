import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api } from './slider/api'
@Injectable({
  providedIn: 'root'
})
export class DataService {
  apiUrl = 'http://www.splashbase.co/api/v1/images/latest';
  constructor(private _http: HttpClient ) { }
  getImages() {
    console.log('get observable for work with async data', this._http.get(this.apiUrl))
    return this._http.get(this.apiUrl);
  }
}
