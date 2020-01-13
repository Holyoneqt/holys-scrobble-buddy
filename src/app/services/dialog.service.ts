import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';

import { InfoDialogComponent, InfoDialogData } from '../components/info-dialog/info-dialog.component';
import { PromptDialogComponent, PromptDialogData } from '../components/prompt-dialog/prompt-dialog.component';


@Injectable({ providedIn: 'root' })
export class DialogService {

    constructor(private promptDialog: MatDialog, private infoDialog: MatDialog) {}

    public openPromptDialog(dialogData: PromptDialogData): Observable<string> {
        return this.promptDialog.open(PromptDialogComponent, {
            data: dialogData,
            disableClose: true,
        }).afterClosed();
    }

    public openInfoDialog(dialogData: InfoDialogData): Observable<void> {
        return this.promptDialog.open(InfoDialogComponent, {
            data: dialogData,
            disableClose: true,
        }).afterClosed();
    } 

}
