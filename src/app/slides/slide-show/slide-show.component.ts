import { Component, Input, SimpleChanges, OnChanges, SimpleChange, ViewChild } from '@angular/core';
import { SlideShowSlide } from 'src/app/models/slide-show/slide-show';
import { HttpClient } from '@angular/common/http';
import { RandomImageList } from 'src/app/models/slide-show/image-list';
import { NgbCarousel, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'slide-slide-show',
  templateUrl: './slide-show.component.html',
  styleUrls: ['./slide-show.component.css']
})
export class SlideShowComponent implements OnChanges {
  @ViewChild(NgbCarousel) carousel: NgbCarousel;
  @Input() model: SlideShowSlide;
  @Input() isActiveSlide: boolean;
  constructor(config: NgbCarouselConfig, private _http: HttpClient) {
    config.showNavigationArrows = false;
    config.showNavigationIndicators = false;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = false;
  }
  public imageList: Array<string>;
  slideMover: Subscription;
  public img: HTMLImageElement;



  ngOnChanges(changes: SimpleChanges) {
    const activeSlide: SimpleChange = changes.isActiveSlide;

    if (activeSlide) {
      if (activeSlide.currentValue === true) {
        this.getImages().then(results => {
          this.imageList = results.images;
          this.displayNextSlide();
        })
      } else {
        this.imageList = [];
      }
    }
  }

  //Randomly display a slide from teh array (if there are
  //no slides that need to be forced to be displayed)
  private displayNextSlide(): void {

    if (this.imageList && this.imageList.length) {
      this.selectSlide(this.getRandomSlide());
    }
  }

  private getRandomSlide(): number {

    var random: number = 0;
    do {
      random = this.getRandomInt(this.imageList.length);
      //  console.log('Random number :- 'imageList+ random);
    } while (this.imageList.length > 1 && (this.carousel && (random.toString() === this.carousel.activeId)))
    //If there is only 1 slide then no need to loop as it is the only one to display.
    //If there is more than one slide then make sure that next selected slide is not equal to current one
    //so as to get the slides rotating around

    // console.log('Random number selected:- ' + random);
    return random;
  }

  //get a random number so as to randmise the display of the tiles
  private getRandomInt(max) {
    //If there is only 1 slide the force the first slide in the array to be shown
    if (max === 1)
      return 0;

    //  console.log('number of slides to choose from:- ' + max);
    let random = Math.random();
    //  console.log("Random number :- " + random);
    let result = Math.floor(random * max);

    return result;
  }


  private selectSlide(slide: number): void {
    //if carousel is fully initialised
    if (this.carousel) {
      //for inital load...do some basic setup here


      if (this.carousel.activeId !== slide.toString()) {
        setTimeout(() => {
          this.carousel.select(slide.toString());
          console.log('Slide ' + slide + ' selected');
        });
      }

      //set timer to check for next slide
      //except for video slides
      //they will emit an event with the duration of hte slide
      if (this.slideMover)
        this.slideMover.unsubscribe();
      this.slideMover = timer(5000).subscribe(() => this.displayNextSlide());
    }
  }

  getImages(): Promise<RandomImageList> {
    return this._http.get<RandomImageList>('http://localhost:8888/images').toPromise()
  }

}
