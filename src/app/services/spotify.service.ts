import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { AppConfig } from '../app-config/app.config';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class SpotifyService {

    constructor(private _http: Http) {
    }

    private commonHeader(): Headers {
        return new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + AppConfig.settings.access_token
        });
    }

    public refreshToken(): Observable<SpotifyApi.RefreshTokenResponse> {
        return this.get<SpotifyApi.RefreshTokenResponse>('http://localhost:8888/refresh_token?refresh_token=' + AppConfig.settings.refresh_token);
    }

    public getPlaylists(): Observable<SpotifyApi.PlaylistSearchResponse> {
        return this.get<SpotifyApi.PlaylistSearchResponse>('https://api.spotify.com/v1/me/playlists?limit=50');
    }

    public getDevices(): Observable<SpotifyApi.Device[]> {
        return this.get<SpotifyApi.DevicesResponse>('https://api.spotify.com/v1/me/player/devices').pipe(
            map((response) => {
                return response.devices;
            })
        );
    }

    public startPlaylist(playlist_uri: string) {
        this.put('https://api.spotify.com/v1/me/player/play?device_id=' + AppConfig.settings.Device.id, {
            "context_uri": playlist_uri,
            "offset": {
                "position": 0
            },
            "position_ms": 0
        }).subscribe();
    }

    public pause() {
        this.put('https://api.spotify.com/v1/me/player/pause?device_id=' + AppConfig.settings.Device.id, "").subscribe();
    }

    public play() {
        this.put('https://api.spotify.com/v1/me/player/play?device_id=' + AppConfig.settings.Device.id, "").subscribe();
    }

    public playerIsCurrentlyPlaying(): Observable<boolean> {
        return this.get<SpotifyApi.PlaybackResponse>('https://api.spotify.com/v1/me/player').pipe(
            map((response) => {
                return response.is_playing
            })
        );
    }

    public resume() {
        this.put('https://api.spotify.com/v1/me/player/play?device_id=' + AppConfig.settings.Device.id, "").subscribe();
    }

    public volume100Percent() {
        this.put('https://api.spotify.com/v1/me/player/volume?device_id=' + AppConfig.settings.Device.id + '&volume_percent=100', "").subscribe();
    }

    public volume50Percent() {
        this.put('https://api.spotify.com/v1/me/player/volume?device_id=' + AppConfig.settings.Device.id + '&volume_percent=50', "").subscribe();
    }

    public volume75Percent() {
        this.put('https://api.spotify.com/v1/me/player/volume?device_id=' + AppConfig.settings.Device.id + '&volume_percent=75', "").subscribe();
    }

    public volume25Percent() {
        this.put('https://api.spotify.com/v1/me/player/volume?device_id=' + AppConfig.settings.Device.id + '&volume_percent=25', "").subscribe();
    }


    private put<T>(url: string, body: any): Observable<T> {
        const requestOptions = new RequestOptions({
            method: RequestMethod.Put,
            headers: this.commonHeader()
        });

        return this._http.put(`${url}`, body, requestOptions).pipe(
            catchError((err) => {
                if (err.status === 401) {
                    this.refreshToken().subscribe(data => {
                        AppConfig.settings.access_token = data.access_token;
                        AppConfig.save();
                    });
                } else {
                    console.log(`An error occured on ${url}: error:${JSON.stringify(err.json())}`);
                    return observableThrowError([]);
                }
            }),
            map((response) => {
                return response.json()
            }));
    }

    private get<T>(url: string): Observable<T> {
        const requestOptions = new RequestOptions({
            method: RequestMethod.Get,
            headers: this.commonHeader()
        });

        return this._http.get(`${url}`, requestOptions).pipe(
            catchError((err) => {
                if (err.status === 401) {
                    this.refreshToken().subscribe(data => {
                        AppConfig.settings.access_token = data.access_token;
                        AppConfig.save();
                    });
                } else {
                    console.log(`An error occured on ${url}: error:${JSON.stringify(err.json())}`);
                    return observableThrowError([]);
                }
            }),
            map((response) => response.json()));
    }
}