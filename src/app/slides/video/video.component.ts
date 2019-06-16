import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { VideoSlide } from 'src/app/models/video/video-slide';

@Component({
  selector: 'slide-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnChanges {

  @Input() model: VideoSlide;
  @Input() isActiveSlide: boolean;
  @Output() duration = new EventEmitter<number>();
  @ViewChild('videoPlayer') videoplayer: ElementRef;
  public fileName: string;
  ngOnChanges(changes: SimpleChanges) {
    const activeSlide: SimpleChange = changes.isActiveSlide;
    if (activeSlide.currentValue === true) {
      this.fileName = this.model.Filename;
      this.videoplayer.nativeElement.src = this.model.Filename;
      this.videoplayer.nativeElement.addEventListener('loadeddata', function (_event: any) {
        this.startVideoPlayer(_event);
      }.bind(this));
    } else {
      this.fileName = '';
      this.videoplayer.nativeElement.pause()
      this.videoplayer.nativeElement.removeEventListener('loadeddata', this.startVideoPlayer)
    }
  }
  private startVideoPlayer(_event: any) {
    var duration = this.duration;

    if (this.videoplayer.nativeElement.readyState >= 2) {
      this.videoplayer.nativeElement.play().then(function () {
        duration.emit(Math.ceil(_event.target.duration));
      })
        .catch(function (error) {
          //something happened so give a duration of 1 second so carousle moves onto next slide
          duration.emit(Math.ceil(1));
        });
    }
  }


}
