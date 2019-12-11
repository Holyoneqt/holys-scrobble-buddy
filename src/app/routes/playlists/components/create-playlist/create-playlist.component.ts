import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-create-playlist',
  templateUrl: './create-playlist.component.html',
})
export class CreatePlaylistDialogComponent {

  constructor(public dialogRef: MatDialogRef<CreatePlaylistDialogComponent>) { }

  public close(name?: string): void {
      this.dialogRef.close(name);
  }

}
