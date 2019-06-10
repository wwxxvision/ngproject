import { Component, OnInit } from '@angular/core';
import { log } from 'util';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Api } from './api';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  constructor() {}
  ngOnInit() {

  }

}
