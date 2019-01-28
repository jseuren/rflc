import { APP_INITIALIZER } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgbCarouselModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselBasicComponent } from './carousel-basic/carousel-basic.component';
import { CountdownClockComponent } from './slides/countdown-clock/countdown-clock.component';
import { IndividualLeaderboardComponent } from './slides/individual-leaderboard/individual-leaderboard.component';
import { TeamLeaderboardComponent } from './slides/team-leaderboard/team-leaderboard.component';
import { UpcomingScheduleComponent } from './slides/upcoming-schedule/upcoming-schedule.component';
import { InstagramComponent } from './slides/instagram/instagram.component';
import { SlideShowComponent } from './slides/slide-show/slide-show.component';
import { SponsorsComponent } from './slides/sponsors/sponsors.component';
import { FundraisingComponent } from './slides/fundraising/fundraising.component';
import { FundraisingStatsComponent } from './slides/fundraising-stats/fundraising-stats.component';
import { VideoComponent } from './slides/video/video.component';
import { AnnouncementComponent } from './slides/announcement/announcement.component';
import { WeatherComponent } from './slides/weather/weather.component';
import { AppConfig } from './app-config/app.config';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { SpotifyPlayerComponent } from './spotify-player/spotify-player/spotify-player.component'; 
export function initializeApp(appConfig: AppConfig) {
  return () => appConfig.initialize();
}

@NgModule({
  imports:      [ 
    BrowserModule, 
    NgbCarouselModule, 
    NgbModule.forRoot(),
    RouterModule.forRoot([]),
    AppRoutingModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [
    AppConfig,
    { provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppConfig], multi: true }
  ],
  declarations: [ 
    AppComponent, 
    CarouselBasicComponent, 
    CountdownClockComponent, 
    IndividualLeaderboardComponent, 
    TeamLeaderboardComponent, 
    UpcomingScheduleComponent, 
    InstagramComponent, 
    SlideShowComponent, 
    SponsorsComponent, 
    FundraisingComponent, 
    FundraisingStatsComponent, 
    VideoComponent, 
    AnnouncementComponent, 
    WeatherComponent, SpotifyPlayerComponent 
  ],
  bootstrap:    [ 
    AppComponent 
  ]
})
export class AppModule { }