import { Component, OnInit } from '@angular/core';
import { LocalStorageKey, LocalStorageService } from 'src/app/services/localstorage.service';
import { LogService } from 'src/app/services/log.service';

@Component({
    selector: 'app-config',
    templateUrl: './config.component.html',
    styleUrls: ['./config.component.css'],
})
export class ConfigComponent implements OnInit {

    public advancedSettingsIcon = 'expand_more';
    public advancedSettingsHeight = '0px';

    public lastfmName: string;

    constructor(public logService: LogService, private localStorage: LocalStorageService) { }

    public ngOnInit(): void {
        this.lastfmName = this.localStorage.get(LocalStorageKey.LastfmName);
    }

    public setLastFmName(name: string): void {
        this.localStorage.set(LocalStorageKey.LastfmName, name);
    }

    public toggleAdvancedSettings(): void {
        if (this.advancedSettingsHeight === '0px') {
            this.advancedSettingsHeight = '200px';
            this.advancedSettingsIcon = 'expand_less';
        } else {
            this.advancedSettingsHeight = '0px';
            this.advancedSettingsIcon = 'expand_more';
        }
    }

}
