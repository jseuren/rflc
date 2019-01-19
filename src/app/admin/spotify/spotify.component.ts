import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import { Playlists } from 'src/app/models/spotify/playlists';
import { AppConfig } from 'src/app/app-config/app.config';
import { Router } from '@angular/router';
import { Playlist } from 'src/app/models/spotify/playlist';

@Component({
  selector: 'app-spotify',
  templateUrl: './spotify.component.html',
  styleUrls: ['./spotify.component.css'],
  providers:[SpotifyService]
})
export class SpotifyComponent implements OnInit {

  //assign appConfig to component so as it can be used at template level
  AppConfigLocal = AppConfig;
  private userPlaylists: SpotifyApi.PlaylistSearchResponse;
  constructor(private _spotifyService : SpotifyService, private router: Router) {

    if(AppConfig.settings.AuthenticationBearerToken) {

      //playlist selection only here
      _spotifyService.getPlaylists().subscribe(playlists => {
        this.userPlaylists = playlists;
      });
    } else if(location.hash) { //if we are returning from Spotify authentication
    //   this.route.fragment.subscribe((fragment: string) => {
    //     var authParams = this.parseParms(fragment);
    //     if(!authParams.state)
    //     {
    //       alert('No State returned from Spotify.  Hijack attempt');
    //       return;
    //     }
    //     if(authParams.state !== globals.AuthenticationState) {
    //       alert('State returned from Spotify to not match.  Hijack attempt');
    //       return;
    //     }
    //     if(!authParams.access_token) {
    //       alert('No Token Returned From Spotify');
    //       return;
    //     } else {
    //       globals.AuthenticationBearerToken = authParams.access_token;
    //       globals.Expires = authParams.expires_in;
    //     }

    //     //need to dynamically load
    //     //<script src="https://sdk.scdn.co/spotify-player.js"></script>
    //     //after confirmation of authentication as well as playlist selected
    //  // var authenticationValues = location.hash.substring(1,location.hash.length).split('&').;

    //   });
    } //else {
     // window.location.href = 'https://accounts.spotify.com/authorize?client_id=a47d16f20d5d4856a604272ccfa4a277&redirect_uri=' + window.location.href + '&response_type=token&state=' + globals.AuthenticationState;
   // }
   }

  ngOnInit() {
  }

  onSpotifyPlaylistSelect(playlist: SpotifyApi.PlaylistObjectFull) {
    AppConfig.settings.SelectedPlaylistDetails = playlist;
    AppConfig.settings.Playlist = playlist.id;
    this._spotifyService.getPlaylist(playlist.id).subscribe(playlist => {
      AppConfig.settings.SelectedPlayList = playlist;
      this.router.navigateByUrl('admin');
    });
  }
 
}
