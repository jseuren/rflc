import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import { AppConfig } from 'src/app/app-config/app.config';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-spotify',
  templateUrl: './spotify.component.html',
  styleUrls: ['./spotify.component.css'],
  providers: [SpotifyService]
})
export class SpotifyComponent implements OnInit {

  //assign appConfig to component so as it can be used at template level
  AppConfigLocal = AppConfig;
  private userPlaylists: SpotifyApi.PlaylistSearchResponse;
  private userDevices: SpotifyApi.Device[];
  constructor(private _spotifyService: SpotifyService, private activatedRoute: ActivatedRoute, private router: Router) {

    activatedRoute.queryParams.subscribe(params => {
      AppConfig.settings.access_token = new URLSearchParams(window.location.search).get('access_token');
      AppConfig.settings.refresh_token = new URLSearchParams(window.location.search).get('refresh_token');
    })


    _spotifyService.getDevices().subscribe(devices => {
      this.userDevices = devices;
    },err => {
        console.log(err)
    },() => {
        //completed
    });

    _spotifyService.getPlaylists().subscribe(playlists => {
      this.userPlaylists = playlists;
    },err => {
        console.log(err)
    },() => {
        //completed
    });
  }

  ngOnInit() {
  }

  onSpotifyPlaylistSelect(playlist: SpotifyApi.PlaylistObjectFull) {
    AppConfig.settings.SelectedPlaylistDetails = playlist;
    AppConfig.settings.Playlist = playlist.id;
  }

  onSpotifyDeviceSelect(device: SpotifyApi.Device) {
    AppConfig.settings.Device = device;
    AppConfig.settings.DeviceId = device.id;
    if (this.readyToPlaySpotify())
      this.router.navigateByUrl('admin');
  }

  logIntoSpotify() {
    window.location.href = "http://localhost:8888/login"
  }

  readyToPlaySpotify(): boolean {
    return (AppConfig.settings.SelectedPlaylistDetails != null && AppConfig.settings.Device != null && AppConfig.settings.access_token != '');
  }

  resume(): void {
    this._spotifyService.resume();
  }

  pause(): void {
    this._spotifyService.pause();
  }
  startPlaylist() : void {
    this._spotifyService.startPlaylist(AppConfig.settings.SelectedPlaylistDetails.uri);
  }

  volume100() : void {
    this._spotifyService.volume100Percent();
  }

  volume75() : void {
    this._spotifyService.volume75Percent();
  }

  volume50() : void {
    this._spotifyService.volume50Percent();
  }

  volume25() : void {
    this._spotifyService.volume25Percent();
  }

}
