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

export interface ScrappedTrack extends ScrappedData {
    img: string;
    name: string;
    scrobbels: number;
    artist: string;
}

// tslint:disable-next-line: no-empty-interface
export interface ScrappedArtist extends ScrappedData {
    img: string;
    name: string;
    scrobbels: number;
}
