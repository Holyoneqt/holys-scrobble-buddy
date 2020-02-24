import { ComponentType } from '@angular/cdk/portal';
import { Injectable, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Observable } from 'rxjs';

import { InfoDialogComponent, InfoDialogData } from '../components/info-dialog/info-dialog.component';
import { PromptDialogComponent, PromptDialogData } from '../components/prompt-dialog/prompt-dialog.component';


@Injectable({ providedIn: 'root' })
export class DialogService {

    constructor(private promptDialog: MatDialog, private infoDialog: MatDialog, private dialog: MatDialog) {}

    public openPromptDialog(dialogData: PromptDialogData): Observable<string> {
        return this.promptDialog.open(PromptDialogComponent, {
            data: dialogData,
            disableClose: true,
        }).afterClosed();
    }

    public openInfoDialog(dialogData: InfoDialogData): Observable<void> {
        return this.infoDialog.open(InfoDialogComponent, {
            data: dialogData,
            disableClose: true,
        }).afterClosed();
    } 

    public open<T = void>(ref: ComponentType<any> | TemplateRef<any>, options: MatDialogConfig): Observable<T> {
        return this.dialog.open(ref, options).afterClosed();
    }

}
