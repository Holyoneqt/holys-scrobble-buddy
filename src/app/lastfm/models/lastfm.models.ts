export interface LastfmUrl {
    /** need this to know how to scrap the html that we get */
    internalType: LastfmApiGetType;
    /** Url to call */
    lastfmUrl: string;
}

export type LastfmApiGetType = 'artists' | 'albums' | 'tracks' | 'topTracksOfArtist' | 'topAlbumsOfArtist' | 'albumDetail';
export interface LastfmApiGetCall {
    type: LastfmApiGetType;
    parameters?: {
        [key: string]: any; 
    }
}

export interface LastfmApiUrlParameters {
    user?: string,
    from?: Date,
    to?: Date,
}

export interface WeeklyArtistsChartsResponse {
    weeklyartistchart: {
        artist: Artist[];
        '@attr': {
            user: string;
            from: string;
            to: string;
        }
    };
}

export interface UserInfo {}

export interface Artist {
    '@attr': {
        rank: string;
    };
    mbid: string;
    playcount: string;
    name: string;
    url: string;
}

export type ScrappedItemType = 'track' | 'album' | 'artist';
export interface ScrappedItem {
    type: ScrappedItemType;
    img: string;
    track?: string;
    artist?: string;
    album?: string;
    scrobbels: number;
}

export interface ScrappedTrack {
    img: string;
    track: string;
    scrobbels: number;
    artist: string;
}

export interface ScrappedArtist {
    img: string;
    artist: string;
    scrobbels: number;
}
