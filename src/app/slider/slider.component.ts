import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service'
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Api } from './api';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  images: Api[];
  constructor(private _dataService: DataService) {}
  ngOnInit() {
    return this._dataService.getImages()
      .subscribe(data => this.images = data);
  }

}
