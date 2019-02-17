import { Component, ViewChild, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { NgbCarouselConfig, NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { interval, timer,  Subscription } from 'rxjs';
import { ISlide } from '../models/slide';
import { SlideType } from '../models/slide-type';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment/moment';
import { CountdownClockSlide } from '../models/countdown-clock/countdown-clock-slide';
import { SpotifyService } from '../services/spotify.service';
import { NgbSlideEvent } from '@ng-bootstrap/ng-bootstrap/carousel/carousel';
import { first } from 'rxjs/operators';
import { from } from 'rxjs';
import { SpotifyPlayerComponent } from '../spotify-player/spotify-player/spotify-player.component';
import { ActivatedRoute } from '@angular/router';

const intervalTime: number = 5000;
//const slideMover = interval(intervalTime);
//check every second of a slide needs to be forced to how
const secondsCounter = interval(1000);
const slideRetreiver = interval(intervalTime);
@Component({
  selector: 'ngb-carousel-basic',
  templateUrl: './carousel-basic.component.html',
  styleUrls: ['./carousel-basic.component.css'],
  providers: [NgbCarouselConfig, SpotifyService]
})
export class CarouselBasicComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild(NgbCarousel) carousel: NgbCarousel;
  @ViewChild(SpotifyPlayerComponent) spotifyPlayer: SpotifyPlayerComponent;

  //Allow slide type enum to be used in templates
  SlideType: any = SlideType;
  slides: Array<ISlide>;
  slidesFromServer: Array<ISlide>;

  slideMover: Subscription;

  constructor(config: NgbCarouselConfig, private _http: HttpClient, private route: ActivatedRoute, ) {
    // customize default values of carousels used by this component tree
    config.showNavigationArrows = false;
    config.showNavigationIndicators = false;
    // customize default values of carousels used by this component tree
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;
    //2 days....we want to custom control the sliding
    //so set a time interval that will not slide through 
    //automatically, but allow us to control it
    config.interval = 172800000;


  }

  //get the array of slides from the server
  getSlides(): Promise<Array<ISlide>> {
    return this._http.get<Array<ISlide>>('./assets/sampleSlides.json').toPromise().then(slides => {
      return slides;
    });
  }
  ngOnDestroy() {
    this.spotifyPlayer.pause();
  }

  ngOnInit(): void {
    this.route.data
      .subscribe(data => {
        this.slidesFromServer = data.slides;
        this.slides = data.slides;
      });
  }

  ngAfterViewInit() {

    //seems to work better here to start the initiaiting of the slide
    //Will be able to get a reference to the carousel
    setTimeout(() => {
      this.displayNextSlide();
    });

    //This is here to check if a slide needs to show at a specific time
    secondsCounter.subscribe(() => {
      this.checkForForcedSlideDisplay();
    });

    //half way through a slide retireveal get updated Slides from server
    setTimeout(() => {
      slideRetreiver.subscribe(() => {
        this.getSlides().then(result => {
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
    var forcedSlides = this.slidesFromServer ? this.slidesFromServer.filter(x => {
      if (x.ForceSlideToShowAtTime) {
        var forceTime = moment(x.ForceSlideToShowAtTime);
        var endTime = moment(x.ForceSlideToShowAtTime).add(x.SecondsToForceShowFor, 'seconds');
        //if the forced time has passed but end forced time is less than now
        if (forceTime < moment() && endTime > moment()) {
          return true;
        }
      }
      return false;
    }) : [];
    //if there are any forced slides
    if (forcedSlides && forcedSlides.length) {
      this.slides = forcedSlides;
      //there may bemultipe configured so only allow them to rotate through until they are invalid
      var int = this.getRandomInt(0, this.slides.length - 1);
      this.selectSlide(this.slides[int]);
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

      if (this.slides && this.slides.length) {
        var int = this.getRandomInt(0, this.slides.length - 1);
        this.selectSlide(this.slides[int]);
      }
    }

  }

  //get a random number so as to randmise the display of the tiles
  private getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  private selectSlide(slide: ISlide): void {
    //if carousel is fully initialised
    if (this.carousel) {
      this.carousel.select(slide.SlideId);
      if (this.slideMover)
        this.slideMover.unsubscribe();
      this.slideMover = timer(slide.ShowForSeconds * 1000).subscribe(() => this.displayNextSlide());
    }
  }

  onCarouselSlide(params: NgbSlideEvent): void {

    var currentSlide: ISlide;

    //Check if it is a video slide and we need to pause Spotify
    from(this.slides)
      .pipe(first(slide => slide.SlideId === params.current)).subscribe(
        current => {
          currentSlide = current;
          if (current.SlideType === SlideType.Video) {
            this.spotifyPlayer.pause();
          }
        });

    //if currentslide is not a video slide
    if (currentSlide.SlideType !== SlideType.Video) {
      //If previous slide was a video and current one is not a video the restart Spotify
      from(this.slides)
        .pipe(first(slide => slide.SlideId === params.prev)).subscribe(
          previous => {
            if (previous.SlideType === SlideType.Video) {
              this.spotifyPlayer.resume();
            }
          });
    }

  }
}
