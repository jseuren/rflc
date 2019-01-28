
export interface IAppConfig  {
    access_token:string;
    refresh_token:string;
    Playlist:string;
    SelectedPlaylistDetails: SpotifyApi.PlaylistBaseObject;
    Device: SpotifyApi.Device;
    DeviceId: string;
    ClientId: string;
    ClientSecret: string;
}