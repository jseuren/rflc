import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthrizationResponse } from '../models/spotify/authroizationResponse';
import { Playlists } from '../models/spotify/playlists';
import { AppConfig } from '../app-config/app.config';
import { Playlist } from '../models/spotify/playlist';
import { Paging } from '../models/spotify/paging';

@Injectable()
export class SpotifyService {
    private playlistUrl: string;
    private playlistsUrl: string;
    private deleteSongFromPlaylistUrl: string;
    private headers: HttpHeaders;

    constructor(private _http: HttpClient) {
        this.headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + AppConfig.settings.AuthenticationBearerToken
        });
    }
        

    public playSong(id: string, deviceId: string, bearerToken: string) {
        this.playlistUrl = 'https://api.spotify.com/v1/me/player/play?devide_id=' + deviceId + '/tracks';
        var body = {
            context_uri: id,
            offset: {
                position: 5
            },
            position_ms: 0
        }
        let g = new HttpParams();
        // g.append()

        return this._http.get(this.playlistUrl, { headers: this.headers, params: g });
    }

    public removeTrackFromPlaylist(id: string, playlistId: string) {
        this.deleteSongFromPlaylistUrl = 'https://api.spotify.com/v1/playlistId/' + playlistId + '/tracks';
        return this._http.delete(this.deleteSongFromPlaylistUrl, { headers: this.headers });
    }

    public getPlaylist(id: string) {
        this.playlistUrl = 'https://api.spotify.com/v1/playlists/' + id + '/tracks';
        return this._http.get<SpotifyApi.PagingObject<SpotifyApi.PlaylistTrackObject>>(this.playlistUrl, { headers: this.headers });
    }

    public getPlaylists() {
        this.playlistsUrl = 'https://api.spotify.com/v1/me/playlists/';
        return this._http.get<SpotifyApi.PlaylistSearchResponse>(this.playlistsUrl, { headers: this.headers });
    }

    public requestAuthorization() {


        return this._http.post<AuthrizationResponse>('https://accounts.spotify.com/api/token', "grant_type=client_credentials", {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + AppConfig.settings.AuthenticationBearerToken
            }
        });

        // return this._http.post<AuthrizationResponse>('https://accounts.spotify.com/api/token',"grant_type=client_credentials",{headers: new HttpHeaders({
        //     'Content-Type':'application/x-www-form-urlencoded',
        //     'Authorization': 'Basic ' + btoa('a47d16f20d5d4856a604272ccfa4a277:d24041947aa34b6d85c28361b37714dd')
        // })});
    }

    public refreshAuthorization() {
        return this._http.post<AuthrizationResponse>('https://accounts.spotify.com/api/token', "grant_type=refresh_token", {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + AppConfig.settings.AuthenticationBearerToken
            })
        });
    }
}