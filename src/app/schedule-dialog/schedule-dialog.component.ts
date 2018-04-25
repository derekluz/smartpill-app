import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

/**
 * @title Dialog Overview
 */
@Component({
    selector: 'app-schedule-dialog',
    templateUrl: 'schedule-dialog.component.html',
    styleUrls: ['schedule-dialog.component.css'],
})
export class ScheduleDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<ScheduleDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
