import { ErrorHandler, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { environment } from 'src/environments/environment';

import { InfoDialogComponent, InfoDialogData } from '../components/info-dialog/info-dialog.component';

@Injectable()
export class HolysErrorHandler implements ErrorHandler {
    
    constructor(private dialog: MatDialog) {}

    public handleError(error: any): void {
        if (environment.production) {
            this.dialog.open(InfoDialogComponent, {
                data: {
                    info: 'Error occured!',
                    infoItems: [error],
                } as InfoDialogData
            });
        } else {
            console.error(error);
        }
    }

}
