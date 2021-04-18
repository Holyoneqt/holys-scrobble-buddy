import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog, MatListOption } from '@angular/material';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { DateSelectorComponent } from 'src/app/components/date-selector/date-selector.component';
import { InfoDialogComponent, InfoDialogData } from 'src/app/components/info-dialog/info-dialog.component';
import { ScrappedItem, ScrappedTrack } from 'src/app/lastfm/models/lastfm.models';
import { LastfmApiService } from 'src/app/lastfm/services/lastfm-api.service';
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
        { value: '&amp;', replaceWith: '&' },
    ];

    @Input()
    public playlist: SinglePlaylistResponse;

    @ViewChild(DateSelectorComponent, { static: true })
    public dateSelector: DateSelectorComponent;

    public dateFrom: Date;
    public dateTo: Date;

    public dateSelectionClosed = false;
    public loading$: BehaviorSubject<boolean>;
    public tracks$: Observable<ScrappedItem[]>;

    @Output()
    public addTracks = new EventEmitter<TrackObjectFull[]>();

    constructor(private lastfmApi: LastfmApiService, private spotify: SpotifyService, private dialog: MatDialog) { }

    public ngOnInit(): void {
        this.loading$ = new BehaviorSubject(false);
    }

    public searchLastfm(): void {
        this.loading$.next(true);
        this.dateSelector.closeExansionPanel();
        this.tracks$ = this.lastfmApi.get({ type: 'tracks' }).pipe(
            finalize(() => this.loading$.next(false)),
        );
    }

    public addTracksToPlaylist(listOptions: MatListOption[]): void {
        const tracks: ScrappedTrack[] = listOptions.map(option => option.value);
        const httpRequests = tracks.map(track => this.spotify.searchTrack(this.replaceForbiddenStrings(track.track), this.replaceForbiddenStrings(track.artist)));

        let foundTracks = [], noMatches = [];
        forkJoin(httpRequests).subscribe(responses => {
            foundTracks = responses.filter(response => response.tracks.items.length > 0).map(response => response.tracks.items[0]);
            noMatches = responses.filter(response => response.tracks.items.length === 0).map(response => response.tracks.href);

            if (noMatches.length > 0) {
                this.dialog.open(InfoDialogComponent, {
                    data: {
                        info: 'Some Tracks could not be added.',
                        infoItems: noMatches,
                    } as InfoDialogData
                }).afterClosed().subscribe(() => this.addTracks.emit(foundTracks));
            } else {
                this.addTracks.emit(foundTracks);
            }
        });
    }

    public trackAlreadyInPlaylist(track: ScrappedTrack): boolean {
        return this.playlist.tracks.items.find(item => item.track.name.includes(track.track)) !== undefined;
    }

    /** Removes some special chars so spotify has an easier time to find the song */
    private replaceForbiddenStrings(value: string): string {
        let finalValue = value;
        this.FORBIDDEN_STRINGS.forEach(s => finalValue = finalValue.replace(s.value, s.replaceWith));
        return finalValue;
    }

}
