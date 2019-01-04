import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbCarouselConfig, NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { interval } from 'rxjs';
const secondsCounter = interval(1000);
@Component({
  selector: 'ngb-carousel-basic',
  templateUrl: './carousel-basic.component.html',
  styleUrls: ['./carousel-basic.component.css'],
  providers: [ NgbCarouselConfig ]
})
export class CarouselBasicComponent implements AfterViewInit {
  @ViewChild('rflCarousel') carousel: NgbCarousel;

  slides = [
    {
      slideId:"countdown",
      text:"This is the base slide of a countdown timer",
      slideType:"countdown"
    },
    {
      slideId:"clock",
      text:"This is the base slide of a clock",
      slideType:"clock"
    },
    {
      slideId:"individual-leaderboard",
      text:"This is the base slide of an individual leaderbaord",
      slideType:"individual-leaderboard"
    },
    {
      slideId:"team-leaderboard",
      text:"This is the base slide of a team leaderbaord",
      slideType:"team-leaderboard"
    },
    {
      slideId:"schedule",
      text:"This is the base slide of the schedule",
      slideType:"schedule"
    }
  ];

  constructor(private config: NgbCarouselConfig, private _http: HttpClient) {
    // customize default values of carousels used by this component tree
    config.showNavigationArrows = false;
    config.showNavigationIndicators = false;
    // customize default values of carousels used by this component tree
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;
  }

  ngAfterViewInit() {
    this.carousel.pause();

    secondsCounter.subscribe(() => 
      this.displayNextSlide()
    );
  }

  private displayNextSlide(): void {
    this.carousel.select(this.slides[this.getRandomInt(0,this.slides.length - 1)].slideId);
  }

  private getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
