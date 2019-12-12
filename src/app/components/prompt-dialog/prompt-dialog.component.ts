import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

export interface PromptDialogData {
    label: string;
    placeholder: string;
    submitText: string;
}

@Component({
    selector: 'app-prompt-dialog',
    templateUrl: './prompt-dialog.component.html',
})
export class PromptDialogComponent {

    constructor(public dialogRef: MatDialogRef<PromptDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: PromptDialogData) { }

    public close(name?: string): void {
        this.dialogRef.close(name);
    }

}
