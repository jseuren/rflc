import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { VideoSlide } from 'src/app/models/video/video-slide';

@Component({
  selector: 'slide-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements AfterViewInit {

  @Input() model: VideoSlide;
  @Input() isActiveSlide: boolean;
  @Output() duration = new EventEmitter<number>();
  @ViewChild('videoPlayer') videoplayer: ElementRef;

  ngAfterViewInit(): void {
    var duration = this.duration;
    this.videoplayer.nativeElement.addEventListener('loadeddata', function (_event: any) {
      if (this.videoplayer.nativeElement.readyState >= 2) {
        if (this.isActiveSlide) {

          this.videoplayer.nativeElement.play().then(function () {
            duration.emit(Math.ceil(_event.target.duration));
          })
            .catch(function (error) {
              //something happened so give a duration of 1 second so carousle moves onto next slide
              duration.emit(Math.ceil(1));
            });
        }
      }
    }.bind(this)); //Bind the current scope (this) to inner event listener
  }
}
