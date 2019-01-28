import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import { AppConfig } from 'src/app/app-config/app.config';

@Component({
  selector: 'spotify-player',
  templateUrl: './spotify-player.component.html',
  styleUrls: ['./spotify-player.component.css']
})
export class SpotifyPlayerComponent implements OnInit {

  constructor(private _spotifyService: SpotifyService) { }

  ngOnInit() {
    if (this.canPlaySpotify()) {
      this._spotifyService.volume100Percent();
      this._spotifyService.startPlaylist(AppConfig.settings.SelectedPlaylistDetails.uri);
    }
  }

  canPlaySpotify(): boolean {
    return !!(AppConfig.settings.ClientId &&
      AppConfig.settings.ClientSecret &&
      AppConfig.settings.DeviceId &&
      AppConfig.settings.SelectedPlaylistDetails &&
      AppConfig.settings.access_token &&
      AppConfig.settings.refresh_token);
  }

}
