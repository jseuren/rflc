
export interface IAppConfig  {
    AuthenticationBearerToken:string;
    AuthenticationState:string;
    Expires:number;
    Playlist:string;
    SelectedPlayList:SpotifyApi.PagingObject<SpotifyApi.PlaylistTrackObject>;
    SelectedPlaylistDetails: SpotifyApi.PlaylistBaseObject;
}