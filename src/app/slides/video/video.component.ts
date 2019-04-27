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
    var video = this.videoplayer.nativeElement;

    this.videoplayer.nativeElement.addEventListener('loadeddata', function (_event: any) {
      if(video.readyState >= 2) {
        video.play();
        duration.emit(Math.ceil(_event.target.duration));
      }
    });
  }
}
