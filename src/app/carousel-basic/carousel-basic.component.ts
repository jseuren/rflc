import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { NgbCarouselConfig, NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { interval, Observable } from 'rxjs';
import { ISlide } from '../models/slide';
import { SlideType } from '../models/slide-type';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment/moment';
import { CountdownClockSlide } from '../models/countdown-clock/countdown-clock-slide';
const secondsCounter = interval(5000);
@Component({
  selector: 'ngb-carousel-basic',
  templateUrl: './carousel-basic.component.html',
  styleUrls: ['./carousel-basic.component.css'],
  providers: [NgbCarouselConfig]
})
export class CarouselBasicComponent implements AfterViewInit {
  @ViewChild(NgbCarousel) carousel: NgbCarousel;

  SlideType: any = SlideType;
  slides: Array<ISlide>;

  constructor(config: NgbCarouselConfig, private _http: HttpClient) {
    // customize default values of carousels used by this component tree
    config.showNavigationArrows = false;
    config.showNavigationIndicators = false;
    // customize default values of carousels used by this component tree
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;
    config.interval = 172800000; //2 days....we want to custom control the sliding

    this.getSlides().subscribe(result => {
      this.slides = result;
      this.slides = this.getValidSlides();
    });

  }

  getSlides(): Observable<Array<ISlide>> {
    return this._http.get<Array<ISlide>>('./assets/sampleSlides.json');
  }

  ngAfterViewInit() {
    secondsCounter.subscribe(() =>
      this.displayNextSlide()
    );
  }

  private getValidSlides(): Array<ISlide> {
    return this.slides.filter(x => {
      if(x.hasOwnProperty('EndTime')) {
        //if it is a countodown slide, has the time to countdown to
        //already passed ? If so remove slide
        if (moment() > moment((<CountdownClockSlide>x).EndTime)) {
          return false;
        } else {
          //else slide is still valid so keep in array
          return true;
        }
      } else {
        return true;
      }
    })
  }

  private displayNextSlide(): void {
    this.slides = this.getValidSlides();
    var int = this.getRandomInt(0, this.slides.length - 1);
    this.carousel.select(this.slides[int].SlideId);
  }

  private getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
