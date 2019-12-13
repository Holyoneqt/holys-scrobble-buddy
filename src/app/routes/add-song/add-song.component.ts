import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ScrappedTrack } from 'src/app/models/lastfm.models';
import { LastfmService } from 'src/app/services/lastfm.service';

@Component({
    selector: 'app-add-song',
    templateUrl: './add-song.component.html',
    styleUrls: ['./add-song.component.css']
})
export class AddSongComponent implements OnInit {

    public dateFrom = new FormControl(new Date());
    public dateTo = new FormControl(new Date());

    public loading$: BehaviorSubject<boolean>;
    public tracks$: Observable<ScrappedTrack[]>;

    constructor(private lastfm: LastfmService) { }

    public ngOnInit(): void {
        this.loading$ = new BehaviorSubject(false);
    }

    public search(): void {
        this.loading$.next(true);
        this.tracks$ = this.lastfm.getTopTracks(this.dateFrom.value, this.dateTo.value).pipe(
            finalize(() => this.loading$.next(false)),
        );


    }

}
