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

export interface Artist {
    '@attr': {
        rank: string;
    };
    mbid: string;
    playcount: string;
    name: string;
    url: string;
}

export interface ScrappedTrack {
    img: string;
    name: string;
    artist: string;
    scrobbles: number;
}
