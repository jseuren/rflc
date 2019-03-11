import { Component, Input, Output, EventEmitter, OnChanges, SimpleChange } from '@angular/core';
import { VideoSlide } from 'src/app/models/video/video-slide';

@Component({
  selector: 'slide-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnChanges {

  player: YT.Player;
  @Input() model: VideoSlide;
  @Input() isActiveSlide: boolean;
  @Output() duration = new EventEmitter<number>();

  playerVars = {
    cc_lang_pref: 'en'
  };

  constructor() {

  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }): void {
    //   for (let propName in changes) {
    //     let changedProp = changes[propName];
    //     if (propName === 'isActiveSlide') {
    //       if (changedProp.currentValue === true) {
    //         if (this.player) {
    //           if (this.player.getPlayerState() !== YT.PlayerState.PLAYING) {
    //             console.log('IsActiveSlide state change forcing play for video ' + this.model.YouTubeVideoId);
    //             this.playVideo();
    //           }
    //         }
    //       }

    //       if (changedProp.previousValue === true && changedProp.currentValue === false) {
    //         if (this.player.getPlayerState() === YT.PlayerState.PLAYING) {
    //           console.log('IsActiveSlide state change forcing stop for video ' + this.model.YouTubeVideoId);
    //           this.stopVideo();
    //         }
    //       }
    //     }
    //   }
  }


  savePlayer(player) {
    if (!this.player) {
      this.player = player;
      console.log('player object set for video ' + this.model.SlideId);
      if (this.isActiveSlide) {
        this.playVideo();
      } else {
        this.stopVideo();
      }
    }
  }

  onStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
      setTimeout(this.stopVideo, 6000);
    }

    if (event.data == YT.PlayerState.PLAYING) {
      //emit duration back to carousel so as on end of the video
      //it can refresh and request a new video
      let duration = this.player.getDuration();
      this.duration.emit(duration);
      console.log('sent duration of ' + duration + ' seconds to slide for video ' + this.model.SlideId);
    }
  }

  playVideo() {
    if (this.player) {
      let width = document.getElementsByClassName("carousel-item active")[0].clientWidth;
      let height = document.getElementsByClassName("carousel-item active")[0].clientHeight;
      this.player.setSize(width, height);
      console.log('Play video requested for video ' + this.model.SlideId);
      this.player.playVideo();
    }

  }

  pauseVideo() {
    if (this.player)
      this.player.pauseVideo();
  }

  stopVideo() {
    if (this.player)
      this.player.stopVideo();
  }
}
