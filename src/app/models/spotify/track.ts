import { Album } from './album';
import { Artist } from './atrist';

export class Track {
    uri: string;
    id: string | null;
    type: 'track' | 'episode' | 'ad';
    media_type: 'audio' | 'video';
    name: string;
    is_playable: boolean;
    album: Album;
    artists: Artist[];
}