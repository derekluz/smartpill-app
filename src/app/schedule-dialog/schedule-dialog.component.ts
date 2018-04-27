import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-schedule-dialog',
    templateUrl: 'schedule-dialog.component.html',
    styleUrls: ['schedule-dialog.component.css'],
})
export class ScheduleDialogComponent implements OnInit {

    form: FormGroup;
    description: string;
    newMedicine: {
        day_frequence: 0,
        dosage: 0,
        duration_in_days: 0,
        start_time: '00:00'
    };
    numbers = Array.from(Array(5).keys());


    constructor(
        private _formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<ScheduleDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data
    ) {
        this.description = data.description;
    }

    ngOnInit() {
        this.form = this._formBuilder.group({
            dayFrequence: 0,
            dosage: 0,
            durationInDays: 0,
            medicineName: ['', Validators.maxLength(20)],
            startTime: '00:00'
        });
    }

    save() {
        this.dialogRef.close(this.form.value);
    }

    close() {
        this.dialogRef.close();
    }

}
