import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  @ViewChild('slider', {static: false})
  slider: ElementRef
  imagesElements: any;
  firstElement: any;
  lastElement: any;
  slides: any;
  size: number;
  wrapper: any;
  image: any;
  counter: number = 1;
  ngOnInit() {
    return this._dataService.getImages()
      .subscribe(data => this.images = data);
  }
  ngAfterViewInit() {
    this.wrapper = document.querySelector('.js-wrp');
    this.firstElement = this.wrapper.firstChild;
    this.lastElement = this.wrapper.lastChild;
    this.size = this.firstElement.clientWidth;
    this.image = document.querySelectorAll('.slider__image');
    this.wrapper.style.transform = 'translateX('+(-this.size * this.counter)+ 'px)';
    console.log(this.image);
    this.wrapper.addEventListener('transitionend', () => {
      if(this.image[this.counter].id === 'lastSlide'){
        this.wrapper.style.transition = 'none';
        this.counter = this.image.length - this.counter;
        this.wrapper.style.transform = 'translateX('+(-this.size * this.counter)+ 'px)';
      }
      else if(this.image[this.counter].id === 'firstSlide'){
        this.wrapper.style.transition = 'none';
        this.counter = this.image.length - 2;
        this.wrapper.style.transform = 'translateX('+(-this.size * this.counter)+ 'px)';
      }
    })
  }
  rightClick() {
    if (this.counter >= this.image.length - 1) return;
    this.wrapper.style.transition = 'transform 0.4s ease-in-out';
    this.counter++;
    this.wrapper.style.transform = 'translateX('+(-this.size * this.counter)+ 'px)';
  }
  leftClick() {
    if (this.counter <= 0) return;
    this.wrapper.style.transition = 'transform 0.4s ease-in-out';
    this.counter--;
    this.wrapper.style.transform = 'translateX('+(-this.size * this.counter)+ 'px)';
  }
}
