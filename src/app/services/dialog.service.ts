import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';

import { PromptDialogComponent, PromptDialogData } from '../components/prompt-dialog/prompt-dialog.component';


@Injectable({ providedIn: 'root' })
export class DialogService {

    constructor(private dialog: MatDialog) {}

    public openPromptDialog(dialogData: PromptDialogData): Observable<string> {
        return this.dialog.open(PromptDialogComponent, {
            data: dialogData,
            disableClose: true,
        }).afterClosed();
    }

}
