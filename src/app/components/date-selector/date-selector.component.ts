import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatExpansionPanel } from '@angular/material';
import dayjs from 'dayjs';
import { BehaviorSubject } from 'rxjs';
import { LastfmService } from 'src/app/services/lastfm.service';

@Component({
    selector: 'app-date-selector',
    templateUrl: './date-selector.component.html',
    styleUrls: ['./date-selector.component.css']
})
export class DateSelectorComponent implements OnInit {

    @ViewChild(MatExpansionPanel, { static: true })
    protected expansionPanel: MatExpansionPanel;

    private userCreatedDate: Date;

    protected dateFrom$: BehaviorSubject<Date>;
    protected dateTo$: BehaviorSubject<Date>;

    @Output()
    public dateFromChange = new EventEmitter<Date>();
    @Output()
    public dateToChange = new EventEmitter<Date>();

    constructor(private lastfm: LastfmService) { }

    public ngOnInit(): void {
        this.lastfm.getUserInfo().subscribe(userInfo => this.userCreatedDate = new Date(userInfo.user.registered.unixtime * 1000));

        this.dateFrom$ = new BehaviorSubject(new Date());
        this.dateFrom$.subscribe(date => this.dateFromChange.emit(date));
        this.dateTo$ = new BehaviorSubject(new Date());
        this.dateTo$.subscribe(date => this.dateToChange.emit(date));
    }

    public closeExansionPanel(): void {
        this.expansionPanel.close();
    }

    protected selectThis(option: 'year' | 'month' | 'week'): void {
        this.dateFrom$.next(dayjs().startOf(option).toDate());
        this.dateTo$.next(dayjs().endOf(option).toDate());
    }

    protected selectLastDays(days: number): void {
        this.dateTo$.next(new Date());
        this.dateFrom$.next(dayjs(this.dateFrom$.value).subtract(days, 'day').toDate());
    }

    protected selectAllTime(): void {
        this.dateTo$.next(new Date());
        this.dateFrom$.next(this.userCreatedDate);
    }

}
