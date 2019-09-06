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
    const wrapper: HTMLElement = document.querySelector('.wrapper') as HTMLElement, rightBtn: HTMLElement = document.querySelector('.right_button') as HTMLElement,
      leftBtn: HTMLElement = document.querySelector('.left_button') as HTMLElement;
    console.log('get dom elements', wrapper, leftBtn, rightBtn);
    this.valueTransfrom === -150 ? leftBtn.style.display = 'none' : leftBtn.style.display = 'block';
    console.log('if go next, show leftBtn', this.valueTransfrom);
    this.valueTransfrom < (this.anyImages.length - 5) * (-150) ? rightBtn.style.display = 'none' : rightBtn.style.display = 'block';
    console.log('if finished in right slider , hidden rightBtn', this.valueTransfrom);
    const update = (target?: any): any => {
      const goBack = () => {
        console.log('create async function');
        return new Promise((resolve: any) => {
          resolve(
            wrapper.style.transform += `translateX(${-this.valueTransfrom}px)`,
            console.log('get start position slider', wrapper.style.transform)
          );
        })
      }
      console.log('check if first position , then stop go left');
      if (this.valueTransfrom === 150 && target.classList.contains('left_button')) {
        goBack().then(() => this.valueTransfrom = 0);
        console.log('if return true , then goBack() and counter will null', this.valueTransfrom);
      }
    }
    const moveRight: any = (): void => {
      console.log('go right, function for right step');
      leftBtn.style.display = 'block';
      console.log('show left block', leftBtn.style.display);
      wrapper.style.transform += `translateX(-150px)`;
      console.log('moved slider', wrapper.style.transform);
      wrapper.style.transition = '0.5s';
      console.log('set speed transition', wrapper.style.transition);
      this.valueTransfrom += -150;
      console.log('change count value', this.valueTransfrom);
    }
    const moveLeft: any = (): void => {
      rightBtn.style.display = 'block';
      console.log('show right block', leftBtn.style.display)
      wrapper.style.transform += `translateX(150px)`;
      console.log('moved slider', wrapper.style.transform);
      wrapper.style.transition = '0.5s';
      console.log('set speed transition', wrapper.style.transition);
      this.valueTransfrom += 150;
      console.log('change count value', this.valueTransfrom);
      update(event.target);
      console.log('check if dont start position');
    }
    event.target.classList.contains('left_button') ? moveLeft() : moveRight();
    console.log('check left or right button');
  }
}
