import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { VideoSlide } from 'src/app/models/video/video-slide';

@Component({
  selector: 'slide-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent {


  player: YT.Player;
  done: boolean = false;
  @Input() model: VideoSlide;
  @Input() isActiveSlide: boolean;
  @Output() duration = new EventEmitter<number>();

  playerVars = {
    cc_lang_pref: 'en'
  };

  constructor() {

  }


  savePlayer(player) {
    if (!this.player) {
      this.player = player;
      if (this.isActiveSlide) {
        let width = document.getElementsByClassName("carousel-item active")[0].clientWidth;
        let height = document.getElementsByClassName("carousel-item active")[0].clientHeight;
        //  this.player.cueVideoById(this.model.YouTubeVideoId,1,"large");
        this.player.setSize(width, height);
        //console.log('player instance', player);
        this.playVideo();
        //emit duration back to carousel so as on end of the video
        //it can refresh and request a new video
        this.duration.emit(this.player.getDuration());
      } else {
        this.stopVideo();
      }
    }
  }

  onStateChange(event) {
    //console.log('player state', event.data);
    if (event.data == YT.PlayerState.ENDED && !this.done) {
      setTimeout(this.stopVideo, 6000);
      this.done = true;
    }
  }

  playVideo() {
    if (this.player)
      this.player.playVideo();
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
