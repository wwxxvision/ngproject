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
    return this._http.get<Api[]>(this.apiUrl);
  }
}
