import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { NgbCarouselConfig, NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { interval, Observable } from 'rxjs';
import { ISlide } from '../models/slide';
import { SlideType } from '../models/slide-type';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment/moment';
import { CountdownClockSlide } from '../models/countdown-clock/countdown-clock-slide';

const intervalTime: number = 5000;
const slideMover = interval(intervalTime);
//check every second of a slide needs to be forced to how
const secondsCounter = interval(1000);
const slideRetreiver = interval(intervalTime);

@Component({
  selector: 'ngb-carousel-basic',
  templateUrl: './carousel-basic.component.html',
  styleUrls: ['./carousel-basic.component.css'],
  providers: [NgbCarouselConfig]
})
export class CarouselBasicComponent implements AfterViewInit {
  @ViewChild(NgbCarousel) carousel: NgbCarousel;

  //Allow slide type enum to be used in templates
  SlideType: any = SlideType;
  slides: Array<ISlide>;
  slidesFromServer: Array<ISlide>;

  constructor(config: NgbCarouselConfig, private _http: HttpClient) {
    // customize default values of carousels used by this component tree
    config.showNavigationArrows = false;
    config.showNavigationIndicators = false;
    // customize default values of carousels used by this component tree
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;
    config.interval = 172800000; //2 days....we want to custom control the sliding
  }

  //get the array of slides from the server
  getSlides(): Observable<Array<ISlide>> {
    return this._http.get<Array<ISlide>>('./assets/sampleSlides.json');
  }

  ngAfterViewInit() {

    this.getSlides().subscribe(result => {
      this.slidesFromServer = result;
      this.displayNextSlide();
    });

    //this is here to rotate through slides
    slideMover.subscribe(() => {
      this.displayNextSlide();
    });

    //This is here to check if a slide needs to show at a specific time
    secondsCounter.subscribe(() => {
      this.checkForForcedSlideDisplay();
    });

    //half way through a slide retireveal get updated Slides from server
    setTimeout(() => {
      slideRetreiver.subscribe(() => {
        this.getSlides().subscribe(result => {
          this.slidesFromServer = result;
        });
      });
    }, intervalTime / 2)
  }

  //filter out any slide which may no longer be valid but is still in array or 
  //is being sent down by the server
  private getValidSlides(): Array<ISlide> {
    return this.slidesFromServer.filter(x => {
      if (x.hasOwnProperty('CountdownEndTime')) {
        //if it is a countodown slide, has the time to countdown to
        //already passed ? If so remove slide
        if (moment() > moment((<CountdownClockSlide>x).CountdownEndTime)) {
          return false;
        }
      }
      return true;
    });
  }

  //Is there a slide that must be displayed at a partiucalr time ?
  private checkForForcedSlideDisplay(): boolean {
    //filter out the slides that have a forced show time
    var forcedSlides = this.slidesFromServer.filter(x => {
      if (x.ForceSlideToShowAtTime) {
        var forceTime = moment(x.ForceSlideToShowAtTime);
        var endTime = moment(x.ForceSlideToShowAtTime).add(x.SecondsToForceShowFor, 'seconds');
        //if the forced time has passed but end forced time is less than now
        if (forceTime < moment() && endTime > moment()) {
          return true;
        }
      }
      return false;
    });
    //if tehre are nay forced slides
    if (forcedSlides && forcedSlides.length) {
      this.slides = forcedSlides;
      //there may bemultipe configured so only allow them to rotate through until they are invalid
      var int = this.getRandomInt(0, this.slides.length - 1);
      this.carousel.select(this.slides[int].SlideId);
      return true;
    } else {
      return false;
    }
  }

  //Randomly display a slide from teh array (if there are
  //no slides that need to be forced to be displayed)
  private displayNextSlide(): void {
    //If a slide needs to be forced to be dispslayed due to a specified time sent down
    //then let that slide be displayed until it needs to
    if (!this.checkForForcedSlideDisplay()) {
      //filter out anyslides that may no longer be valid to display
      this.slides = this.getValidSlides();

      var int = this.getRandomInt(0, this.slides.length - 1);
      this.carousel.select(this.slides[int].SlideId);
    }

  }

  //get a random number so as to randmise the display of the tiles
  private getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
