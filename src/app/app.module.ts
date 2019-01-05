
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselBasicComponent } from './carousel-basic/carousel-basic.component';
import { CountdownClockComponent } from './slides/countdown-clock/countdown-clock.component';
import { ClockComponent } from './slides/clock/clock.component';
import { IndividualLeaderboardComponent } from './slides/individual-leaderboard/individual-leaderboard.component';
import { TeamLeaderboardComponent } from './slides/team-leaderboard/team-leaderboard.component';
import { UpcomingScheduleComponent } from './slides/upcoming-schedule/upcoming-schedule.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports:      [ BrowserModule, NgbCarouselModule, HttpClientModule ],
  declarations: [ AppComponent, CarouselBasicComponent, CountdownClockComponent, ClockComponent, IndividualLeaderboardComponent, TeamLeaderboardComponent, UpcomingScheduleComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }