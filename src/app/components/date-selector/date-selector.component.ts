import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatExpansionPanel } from '@angular/material';
import dayjs from 'dayjs';
import { BehaviorSubject } from 'rxjs';
import { LastfmApiService } from 'src/app/lastfm/services/lastfm-api.service';

@Component({
    selector: 'app-date-selector',
    templateUrl: './date-selector.component.html',
    styleUrls: ['./date-selector.component.css']
})
export class DateSelectorComponent implements OnInit {

    @Input()
    public from: Date = new Date();
    @Input()
    public to: Date = new Date();

    @ViewChild(MatExpansionPanel, { static: true })
    public expansionPanel: MatExpansionPanel;

    private userCreatedDate: Date;

    public dateFrom$: BehaviorSubject<Date>;
    public dateTo$: BehaviorSubject<Date>;

    @Output()
    public dateFromChange = new EventEmitter<Date>();
    @Output()
    public dateToChange = new EventEmitter<Date>();

    constructor(private lastfmApi: LastfmApiService) { }

    public ngOnInit(): void {
        this.lastfmApi.getUserInfo().subscribe(userInfo => this.userCreatedDate = new Date(userInfo.user.registered.unixtime * 1000));

        this.dateFrom$ = new BehaviorSubject(this.from);
        this.dateFrom$.subscribe(date => this.changeDateFrom(date));
        this.dateTo$ = new BehaviorSubject(this.to);
        this.dateTo$.subscribe(date => this.changeDateTo(date));
    }
    
    public changeDateFrom(date: Date): void {
        const tempTimePeriod = this.lastfmApi.timePeriod.value;
        this.lastfmApi.timePeriod.next({
            from: date,
            to: tempTimePeriod.to,
        });

        this.dateFromChange.emit(date)
    }

    public changeDateTo(date: Date): void {
        const tempTimePeriod = this.lastfmApi.timePeriod.value;
        this.lastfmApi.timePeriod.next({
            from: tempTimePeriod.from,
            to: date,
        });

        this.dateToChange.emit(date)
    }

    public closeExansionPanel(): void {
        this.expansionPanel.close();
    }

    public selectThis(option: 'year' | 'month' | 'week'): void {
        this.dateFrom$.next(dayjs().startOf(option).toDate());
        this.dateTo$.next(dayjs().endOf(option).toDate());
    }

    public selectLastDays(days: number): void {
        this.dateTo$.next(new Date());
        this.dateFrom$.next(dayjs(this.dateFrom$.value).subtract(days, 'day').toDate());
    }

    public selectAllTime(): void {
        this.dateTo$.next(new Date());
        this.dateFrom$.next(this.userCreatedDate);
    }

}
