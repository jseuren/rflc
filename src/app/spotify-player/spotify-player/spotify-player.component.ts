import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import { AppConfig } from 'src/app/app-config/app.config';
import { interval } from 'rxjs';

const refreshTokenCounter = interval(8000);

@Component({
  selector: 'spotify-player',
  templateUrl: './spotify-player.component.html',
  styleUrls: ['./spotify-player.component.css']
})
export class SpotifyPlayerComponent implements OnInit, AfterViewInit {

  constructor(private _spotifyService: SpotifyService) { }

  ngOnInit() {
    if (this.canPlaySpotify()) {
      this._spotifyService.volume100Percent();
      this.startPlaylist();
    }
  }

  ngAfterViewInit() {

    refreshTokenCounter.subscribe(() => {
      this._spotifyService.refreshToken().subscribe(data => {
        AppConfig.settings.access_token = data.access_token;
      })
    });

  }
 
  canPlaySpotify(): boolean {
    return !!(AppConfig.settings.ClientId &&
      AppConfig.settings.ClientSecret &&
      AppConfig.settings.DeviceId &&
      AppConfig.settings.SelectedPlaylistDetails &&
      AppConfig.settings.access_token &&
      AppConfig.settings.refresh_token);
  }

  readyToPlaySpotify(): boolean {
    return (AppConfig.settings.SelectedPlaylistDetails != null && AppConfig.settings.Device != null && AppConfig.settings.access_token != '');
  }

  public startPlaylist(): void {
    this._spotifyService.startPlaylist(AppConfig.settings.SelectedPlaylistDetails.uri);
  }

  public resume(): void {
    if (this.readyToPlaySpotify())
      this._spotifyService.resume();
  }

  public pause(): void {
    if (this.readyToPlaySpotify())
      this._spotifyService.pause();
  }

  public volume100(): void {
    if (this.readyToPlaySpotify())
      this._spotifyService.volume100Percent();
  }

  public volume75(): void {
    if (this.readyToPlaySpotify())
      this._spotifyService.volume75Percent();
  }

  public volume50(): void {
    if (this.readyToPlaySpotify())
      this._spotifyService.volume50Percent();
  }

  public volume25(): void {
    if (this.readyToPlaySpotify())
      this._spotifyService.volume25Percent();
  }

}
