import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-mat-dialog',
  templateUrl: './mat-dialog.component.html',
  styleUrls: ['./mat-dialog.component.scss']
})
export class MatDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<MatDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  closeDialog() {
    this.dialogRef.close('Pizza!');
  }


  goToEvent(link: string) {
    window.open(`https://facebook.com/${link}`, '_blank');
  };


  ngOnInit() {
  }

}
