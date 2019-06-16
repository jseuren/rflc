import { Component, ViewChild, AfterViewInit, OnDestroy, OnInit, EventEmitter } from '@angular/core';
import { NgbCarouselConfig, NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { interval, timer, Subscription } from 'rxjs';
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
import { globalVolumControl } from '../models/GobalVolumeControl/global-volume-control';

const intervalTime: number = 5000;
const secondsCounter = interval(1000);
const slideRetreiver = interval(intervalTime);
const volumControlRetreiver = interval(1000);
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

  globalSoundControlOn: boolean;

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

    this.globalSoundControlOn = true;

  }

  allowSound() {
    return this.globalSoundControlOn;
  }

  isActiveSlide(slide: ISlide) {
    //is teh carousel active and the carousel active slide ID equal to the slide being checked
    return !!this.carousel && (slide.SlideId === this.carousel.activeId);
  }

  //get the array of slides from the server
  async getSlides(): Promise<Array<ISlide>> {
    const slides = await this._http.get<Array<ISlide>>('./assets/sampleSlides.json').toPromise();
    return slides;
  }

  //get the array of slides from the server
  async getMasterVolumeControl(): Promise<boolean> {
    const volumeControl = await this._http.get<boolean>('https://rflapp.azurewebsites.net/settings.php?s=master_volume').toPromise();
    return volumeControl;
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
      volumControlRetreiver.subscribe(() => {
        this.getSlides().then(result => {
          this.slidesFromServer = result;
        });
      });
    }, intervalTime / 2)

    //Every second check for a master volume control to see if sound needs to be switched off
    setTimeout(() => {
      slideRetreiver.subscribe(() => {
        this.getMasterVolumeControl().then(result => {
          if (this.globalSoundControlOn !== result) {
            this.globalSoundControlOn = result;
            if (this.globalSoundControlOn) {
              if (this.spotifyPlayer.isPaused) {
                if (this.slides.find(s => s.SlideId === this.carousel.activeId).SlideType !== SlideType.Video) {
                  this.spotifyPlayer.resume();
                }
              }
            }
          }
        });
      });
    }, 1000)
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
      //there may be multipe configured so only allow them to rotate through until they are invalid
      this.selectSlide(this.getRandomSlide());
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
        this.selectSlide(this.getRandomSlide());
      }
    }
  }

  private getRandomSlide(): ISlide {

    var random: number = 0;
    do {
      random = this.getRandomInt(this.slides.length);
      console.log('Random number :- ' + random);
    } while (this.slides.length > 1 && (this.carousel && (this.slides[random].SlideId === this.carousel.activeId)))
    //If there is only 1 slide then no need to loop as it is the only one to display.
    //If there is more than one slide then make sure that next selected slide is not equal to current one
    //so as to get the slides rotating around

    console.log('Random number selected:- ' + random);
    return this.slides[random];
  }

  //get a random number so as to randmise the display of the tiles
  private getRandomInt(max) {
    //If there is only 1 slide the force the first slide in the array to be shown
    if (max === 1)
      return 0;

    console.log('number of slides to choose from:- ' + max);
    let random = Math.random();
    console.log("Random number :- " + random);
    let result = Math.floor(random * max);

    return result;
  }

  private selectSlide(slide: ISlide): void {
    //if carousel is fully initialised
    if (this.carousel) {
      //for inital load...do some basic setup here
      if (!this.carousel.activeId) {
        if (slide.SlideType !== SlideType.Video && this.globalSoundControlOn)
          this.spotifyPlayer.resume();
      }

      if (this.carousel.activeId !== slide.SlideId) {
        this.carousel.select(slide.SlideId);
        console.log('Slide ' + slide.SlideId + ' selected');
      }

      //set timer to check for next slide
      //except for video slides
      //they will emit an event with the duration of hte slide
      if (slide.SlideType !== SlideType.Video) {
        if (this.slideMover)
          this.slideMover.unsubscribe();
        this.slideMover = timer(slide.ShowForSeconds * 1000).subscribe(() => this.displayNextSlide());
      }
    }
  }

  //event emitter for video slides to accept duration of slide and then
  //refresh / look for next slide
  onDuration(duration: number) {
    //set timer to check for next slide
    console.log('video duration ' + duration + ' seconds received for slide');
    if (this.slideMover)
      this.slideMover.unsubscribe();
    this.slideMover = timer(duration * 1000).subscribe(() => this.displayNextSlide());
  }

  //Check if the spotify player needs to be paused or resumed based on
  //whether or not it is a video slide
  onCarouselSlide(params: NgbSlideEvent): void {
    //Check if it is a video slide and we need to pause Spotify
    from(this.slides)
      .pipe(first(slide => slide.SlideId === params.current)).subscribe(
        current => {
          if (current.SlideType === SlideType.Video || !this.globalSoundControlOn) {
            this.spotifyPlayer.pause();
          }
        });

    //if currentslide is not a video slide
    if (this.slides.find(s => s.SlideId == params.current).SlideType !== SlideType.Video) {
      //If previous slide was a video and current one is not a video the restart Spotify
      from(this.slides)
        .pipe(first(slide => slide.SlideId === params.prev)).subscribe(
          previous => {
            if (previous.SlideType === SlideType.Video && this.globalSoundControlOn) {
              this.spotifyPlayer.resume();
            }
          });
    }
  }
}
