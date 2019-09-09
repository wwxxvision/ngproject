import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service'


@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  constructor(private _dataService: DataService) { }
  anyImages: Array<any>;
  load: boolean;
  slider: any;
  lastElement: any;
  valueTransfrom: any = 0;
  ngOnInit() {
    return this._dataService.getImages()
      .subscribe((data) => {
        let localImage: object = Object.assign({ url: '../assets/img/lai-man-nung-783645-unsplash.jpg' }),
          _localImage: object = Object.assign({ url: '../assets/img/pedro-lastra-157071-unsplash.jpg' });
        console.log('created objects with local src', localImage, _localImage)
        this.anyImages = [localImage, _localImage];
        console.log('added element in array store', localImage, _localImage, this.anyImages);
        data['images'].forEach(element => {
          this.anyImages.push(element);
        });
        console.log('pushing all elements api in array store', this.anyImages, data['images']);
        data['images'] ? this.load = true : this.load = false;
        console.log('If data[images] not undefined , then stop loader', data['images'], this.load);
      })
  }
  changeSlide(event: any): void {
    const moveRight = () : void => {
      console.log('move to left slider');
      this.valueTransfrom -=  150;
    }
    const moveLeft = () : void => {
      console.log('move to right slider');
      this.valueTransfrom +=  150;
    }
    console.log('It is checking , which button press');
    event.target.classList.contains('left_button') ? moveLeft() : moveRight();
  }
}
