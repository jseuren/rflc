import { Component, ViewChild, AfterViewInit, TemplateRef  } from '@angular/core';
import { NgbCarouselConfig, NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { interval } from 'rxjs';
import { Slide } from '../models/slide';
import { SlideType } from '../models/slide-type';
const secondsCounter = interval(1000);
@Component({
  selector: 'ngb-carousel-basic',
  templateUrl: './carousel-basic.component.html',
  styleUrls: ['./carousel-basic.component.css'],
  providers: [ NgbCarouselConfig ]
})
export class CarouselBasicComponent implements AfterViewInit {
  @ViewChild('rflCarousel') carousel: NgbCarousel;

  SlideType: any = SlideType;
  slides: Array<Slide>;

  constructor(private config: NgbCarouselConfig) {
    // customize default values of carousels used by this component tree
    config.showNavigationArrows = false;
    config.showNavigationIndicators = false;
    // customize default values of carousels used by this component tree
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;

    this.slides = [
      { SlideId:"countdown",Header:"This is the base slide of a countdown timer",SlideType:SlideType.CountdownClock},
      { SlideId:"clock",Header:"This is the base slide of a clock",SlideType:SlideType.Clock},
      { SlideId:"individual-leaderboard",Header:"This is the base slide of an individual leaderbaord",SlideType:SlideType.IndividualLeaderBoard},
      { SlideId:"team-leaderboard",Header:"This is the base slide of a team leaderbaord",SlideType:SlideType.TeamLeaderBoard},
      { SlideId:"schedule",Header:"This is the base slide of the schedule",SlideType:SlideType.UpcomingSchedule},
    ];
  }

  ngAfterViewInit() {
    this.carousel.pause();

    secondsCounter.subscribe(() => 
      this.displayNextSlide()
    );
  }

  private displayNextSlide(): void {
    this.carousel.select(this.slides[this.getRandomInt(0,this.slides.length - 1)].SlideId);
  }

  private getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
