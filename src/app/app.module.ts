
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselBasicComponent } from './carousel-basic/carousel-basic.component';
import { CountdownClockComponent } from './slides/countdown-clock/countdown-clock.component';
import { IndividualLeaderboardComponent } from './slides/individual-leaderboard/individual-leaderboard.component';
import { TeamLeaderboardComponent } from './slides/team-leaderboard/team-leaderboard.component';
import { UpcomingScheduleComponent } from './slides/upcoming-schedule/upcoming-schedule.component';
import { InstagramComponent } from './slides/instagram/instagram.component';
import { SlideShowComponent } from './slides/slide-show/slide-show.component';
import { SponsorsComponent } from './slides/sponsors/sponsors.component';

@NgModule({
  imports:      [ BrowserModule, NgbCarouselModule, HttpClientModule ],
  declarations: [ 
    AppComponent, 
    CarouselBasicComponent, 
    CountdownClockComponent, 
    IndividualLeaderboardComponent, 
    TeamLeaderboardComponent, 
    UpcomingScheduleComponent, 
    InstagramComponent, SlideShowComponent, SponsorsComponent 
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }