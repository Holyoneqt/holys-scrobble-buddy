import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

export interface InfoDialogData {
    info: string;
    infoItems?: string[];
}

@Component({
    selector: 'app-info-dialog',
    templateUrl: './info-dialog.component.html',
})
export class InfoDialogComponent {

    constructor(public dialogRef: MatDialogRef<InfoDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: InfoDialogData) { }

    public close(): void {
        this.dialogRef.close();
    }

}
