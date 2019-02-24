import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { VideoSlide } from 'src/app/models/video/video-slide';

@Component({
  selector: 'slide-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent {
 

  player: YT.Player;
  done:boolean = false;
  @Input() model: VideoSlide;
  @Input() isActiveSlide: boolean;

  playerVars = {
    cc_lang_pref: 'en'
  };

  constructor() { 

  }

  
  savePlayer(player) {
    if(!this.player) {
      this.player = player;
      if(this.isActiveSlide) {
        let width = document.getElementsByClassName("carousel-item active")[0].clientWidth;
        let height = document.getElementsByClassName("carousel-item active")[0].clientHeight;
      //  this.player.cueVideoById(this.model.YouTubeVideoId,1,"large");
        this.player.setSize(width,height);
        console.log('player instance', player);
        this.playVideo();
      } else {
        this.player.stopVideo();
      }
    }
  }

  onStateChange(event) {
    console.log('player state', event.data);
    if (event.data == YT.PlayerState.ENDED && !this.done ) {
      setTimeout(this.stopVideo, 6000);
      this.done = true;
    }
  }

  playVideo() {
    this.player.playVideo();
  }
  
  pauseVideo() {
    this.player.pauseVideo();
  }

  stopVideo() {
    this.player.stopVideo();
  }

}
