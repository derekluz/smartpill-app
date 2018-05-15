import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-schedule-dialog',
    templateUrl: 'schedule-dialog.component.html',
    styleUrls: ['schedule-dialog.component.css'],
})
export class ScheduleDialogComponent implements OnInit {
    public form: FormGroup;
    public timeMask = [/[0-2]/, /\d/, ':', /[0-5]/, /\d/];
    public medicine;
    public isNewMedicine: boolean;
    public arrayPosition;
    public newMedicine = {};

    constructor(
        private _formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<ScheduleDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data
    ) {
        this.medicine = data.medicine;
        this.arrayPosition = data.arrayPosition;
    }

    ngOnInit() {
        this.isNewMedicine = this.medicine ? false : true;
        const formData = this.isNewMedicine ? this.newMedicine : this.medicine;
        this.form = this._formBuilder.group({
            day_frequence: formData.day_frequence,
            dosage: formData.dosage,
            duration_in_days: formData.duration_in_days,
            medicine_name: [formData.medicine_name, Validators.maxLength(20)],
            start_time: formData.start_time
        });
    }

    save() {
        const data = {
            medicine: this.form.value,
            arrayPosition: this.arrayPosition,
            isNewMedicine: this.isNewMedicine
        };
        this.dialogRef.close(data);
    }

    close() {
        this.dialogRef.close();
    }

}
