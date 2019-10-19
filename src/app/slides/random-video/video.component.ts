import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RandomVideoList } from 'src/app/models/random-videos/videos';

@Component({
  selector: 'slide-random-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class RandomVideoComponent implements OnChanges {

  constructor(private _http: HttpClient) {
  }

  @Input() isActiveSlide: boolean;
  @Input() allowSound: boolean;
  @Output() duration = new EventEmitter<number>();
  @ViewChild('videoPlayer') videoplayer: ElementRef;
  public fileName: string;


  ngOnChanges(changes: SimpleChanges) {
    const activeSlide: SimpleChange = changes.isActiveSlide;
    const allowSound: SimpleChange = changes.allowSound;
    if (activeSlide) {
      if (activeSlide.currentValue === true) {
        this.getVideos().then(results => {
          this.fileName = this.getRandomVideo(results.videos);
          this.videoplayer.nativeElement.src = this.fileName;
          this.videoplayer.nativeElement.addEventListener('loadeddata', function (_event: any) {
            this.startVideoPlayer(_event);
          }.bind(this));
        })
      } else {
        this.videoplayer.nativeElement.removeEventListener('loadeddata', this.startVideoPlayer);
        if (!this.videoplayer.nativeElement.paused)
          this.videoplayer.nativeElement.pause();
        this.fileName = '';

      }
    }


    if (allowSound) {
      if (allowSound.previousValue != allowSound.currentValue) {
        if (allowSound.currentValue) {
          if (this.isActiveSlide) {
            this.videoplayer.nativeElement.volume = 1;
          }
        } else {
          this.videoplayer.nativeElement.volume = 0;
        }
      }
    }
  }
  private startVideoPlayer(_event: any) {
    var duration = this.duration;

    if (this.videoplayer.nativeElement.readyState >= 2) {
      if (!this.allowSound) {
        this.videoplayer.nativeElement.volume = 0;
      } else {
        this.videoplayer.nativeElement.volume = 1;
      }
      this.videoplayer.nativeElement.play().then(function () {
        duration.emit(Math.ceil(_event.target.duration));
      }).catch(function (error) {
        console.error('error playing video' + error);
        //something happened so give a duration of 1 second so carousle moves onto next slide
        duration.emit(Math.ceil(1));
      });
    }
  }

  getVideos(): Promise<RandomVideoList> {
    return this._http.get<RandomVideoList>('http://localhost:8888/videos').toPromise()
  }

  private getRandomVideo(videos: Array<string>): string {

    var random: number = 0;

    random = this.getRandomInt(videos.length);

    return "./assets/videos/" + videos[random];
  }

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

}
