import { Component, OnInit } from '@angular/core';
import { LogService } from 'src/app/services/log.service';

@Component({
    selector: 'app-config',
    templateUrl: './config.component.html',
    styleUrls: ['./config.component.css'],
})
export class ConfigComponent implements OnInit {

    public advancedSettingsIcon = 'expand_more';
    public advancedSettingsHeight = '0px';

    constructor(public logService: LogService) { }

    public ngOnInit(): void {
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
