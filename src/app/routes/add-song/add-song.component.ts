import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatListOption } from '@angular/material';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ScrappedTrack } from 'src/app/models/lastfm.models';
import { LastfmService } from 'src/app/services/lastfm.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
    selector: 'app-add-song',
    templateUrl: './add-song.component.html',
    styleUrls: ['./add-song.component.css']
})
export class AddSongComponent implements OnInit {

    private readonly FORBIDDEN_STRINGS = [
        { value: 'Starfucker', replaceWith: 'STRFKR' },
        { value: '\'', replaceWith: '' }, 
    ];

    @Input()
    public playlist: SinglePlaylistResponse;

    public dateFrom = new FormControl(new Date());
    public dateTo = new FormControl(new Date());

    public loading$: BehaviorSubject<boolean>;
    public tracks$: Observable<ScrappedTrack[]>;

    constructor(private lastfm: LastfmService, private spotify: SpotifyService) { }

    public ngOnInit(): void {
        console.log(this.playlist);
        this.loading$ = new BehaviorSubject(false);
    }

    public searchLastfm(): void {
        this.loading$.next(true);
        this.tracks$ = this.lastfm.getTopTracks(this.dateFrom.value, this.dateTo.value).pipe(
            finalize(() => this.loading$.next(false)),
        );
    }

    public addSongsToPlaylist(listOptions: MatListOption[]): void {
        const tracks: ScrappedTrack[] = listOptions.map(option => option.value);
        const httpRequests = tracks.map(track => this.spotify.searchTrack(this.replaceForbiddenStrings(track.name), this.replaceForbiddenStrings(track.artist)));

        let foundTracks = [], noMatches = [];
        forkJoin(httpRequests).subscribe(responses => {
            foundTracks = responses.filter(response => response.tracks.items.length > 0).map(response => response.tracks.items[0]);
            noMatches = responses.filter(response => response.tracks.items.length === 0).map(response => response.tracks.href);
            
            console.log(foundTracks);
            console.log(noMatches);
        });
    }

    public trackAlreadyInPlaylist(track: ScrappedTrack): boolean {
        return this.playlist.tracks.items.find(item => item.track.name.includes(track.name)) !== undefined;
    }

    /** Removes some special chars so spotify has an easier time to find the song */
    private replaceForbiddenStrings(value: string): string {
        let finalValue = value;
        this.FORBIDDEN_STRINGS.forEach(s => finalValue = finalValue.replace(s.value, s.replaceWith));
        return finalValue;
    }

}
