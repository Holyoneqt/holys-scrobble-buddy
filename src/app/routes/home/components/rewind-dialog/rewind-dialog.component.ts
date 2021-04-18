import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import dayjs from 'dayjs';
import { LastfmHttpService } from 'src/app/lastfm/services/lastfm-http.service';

export interface RewindDialogReturnData {
    from: string;
    to: string;
}

type Season = 'Spring' | 'Summer' | 'Autumn' | 'Winter';

interface MonthDropdownData {
    name: string;
    number: number;
}

@Component({
    selector: 'app-rewind-dialog',
    templateUrl: './rewind-dialog.component.html',
})
export class RewindDialogComponent implements OnInit {

    public readonly months: MonthDropdownData[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        .map((month, index) => ({name: month, number: index + 1}));
    public readonly seasons: Season[] = ['Spring', 'Summer', 'Autumn', 'Winter'];
    
    public years: number[] = [];

    constructor(public dialogRef: MatDialogRef<RewindDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any, private lastfm: LastfmHttpService) { }

    public ngOnInit(): void {
        this.lastfm.getUserInfo().subscribe(userInfo => {
            const userCreateDate = new Date(userInfo.user.registered.unixtime * 1000);
            while (userCreateDate.getFullYear() <= new Date().getFullYear()) {
                this.years.push(userCreateDate.getFullYear());
                userCreateDate.setFullYear(userCreateDate.getFullYear() + 1);
            }
        });
    }

    public cancel(): void {
        this.dialogRef.close();
    }

    public submitMonth(month: number, year: number): void {
        const monthString = month < 10 ? '0' + month : '' + month;
        this.dialogRef.close({
            from: `${year}-${monthString}-01`,
            to: `${year}-${monthString}-${dayjs(`${year}-${month}-01`).endOf('month').get('date')}`
        } as RewindDialogReturnData);
    }

    public submitSeason(season: Season, year: number): void {
        this.dialogRef.close(this.getDates(season, year));
    }

    private getDates(season: Season, year: number): RewindDialogReturnData {
        switch (season) {
            case 'Spring': return {
                from: `${year}-03-20`,
                to: `${year}-06-20`,
            };      

            case 'Summer': return {
                from: `${year}-06-20`,
                to: `${year}-09-20`,
            };      

            case 'Autumn': return {
                from: `${year}-09-20`,
                to: `${year}-12-20`,
            };     

            case 'Winter': return {
                from: `${year}-12-20`,
                to: `${year+1}-03-20`,
            };

            default: return {
                from: `${year}-01-01`,
                to: `${year}-12-31`,
            };
        }
    }

}
