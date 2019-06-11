import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  constructor(private _dataService: DataService) {}
  images = [];
  imagesElements: any;
  firstElement: any;
  lastElement: any;
  slides: any;
  size: number;
  wrapper: any;
  image;
  counter: number = 1;
  ngOnInit() {
    return this._dataService.getImages()
      .subscribe((data) => {
        this.images = data['images']
        this.images = this.images.slice(0,3);
        console.log('Check slice element', this.images = this.images.slice(0,3))
        console.log('Check how response wrote in variable', this.images)
      })
  }
  ngAfterViewInit() {
    this.wrapper = document.querySelector('.js-wrp');
    this.firstElement = this.wrapper.firstChild;
    this.lastElement = this.wrapper.lastChild;
    this.size = this.firstElement.clientWidth;
    this.image = this.wrapper.children;
    this.wrapper.style.transform = 'translateX('+(-this.size + this.counter)+ 'px)';
    let right = document.getElementById('right');
    let left = document.getElementById('left');
    right.addEventListener('click' ,(event) => {
      if (this.counter >= this.image.legth) return;
      event.preventDefault();
      this.wrapper.style.transition = 'transform 0.2s ease-in-out';
      this.counter++;
      console.log('watch counter' ,this.counter);
      this.wrapper.style.transform = 'translateX('+(-this.size * this.counter)+ 'px)';
    })
    left.addEventListener('click',(event) => {
      if (this.counter <= 0) return;
      this.wrapper.style.transition = 'transform 0.2s ease-in-out';
      this.counter--;
      console.log('watch counter' ,this.counter);
      this.wrapper.style.transform = 'translateX('+(-this.size * this.counter)+ 'px)';
    })
    this.wrapper.addEventListener('transitionend', () => {
      if(this.image[this.counter].id === 'lastSlide'){
        this.wrapper.style.transition = 'none';
        console.log('current item', this.image[this.counter]);
        this.counter = this.image.length - this.counter;
        this.wrapper.style.transform = 'translateX('+(-this.size * this.counter)+ 'px)';
      }
      if(this.image[this.counter].id === 'firstSlide'){
        this.wrapper.style.transition = 'none';
        this.counter = this.image.length - 2;
        console.log('current item', this.image[this.counter]);
        this.wrapper.style.transform = 'translateX('+(-this.size * this.counter)+ 'px)';
      }
    })
  }
}
