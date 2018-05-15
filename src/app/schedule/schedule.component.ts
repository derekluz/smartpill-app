import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { Toast, ToasterContainerComponent, ToasterService, ToasterConfig } from 'angular2-toaster';
import { ScheduleBackendService } from './schedule-backend.service';
import { PushNotificationService, SessionService, SocketService } from '../services/services';
import { User } from '../models/user.model';
import { ScheduleDialogComponent } from '../schedule-dialog/schedule-dialog.component';


@Component({
    selector: 'app-schedule',
    templateUrl: './schedule.component.html',
    styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit, OnDestroy {
    public user: User;
    public newMedicine = false;
    public draggerContainerName = 'bag-pills';
    public scheduleBlur = '';
    public toasterconfig: ToasterConfig =
        new ToasterConfig({
            showCloseButton: false,
            tapToDismiss: true,
            timeout: 1500,
            animation: 'slideUp',
            limit: 1,
            positionClass: 'toast-bottom-center',
        });

    constructor(
        private _dialog: MatDialog,
        private _dragula: DragulaService,
        private _router: Router,
        private _scheduleBackendService: ScheduleBackendService,
        private _session: SessionService,
        private _socket: SocketService
    ) {
        this.user = this._session.getUser();
        if (!this.user) {
            this.logout();
        }
        console.log(this.user);
        this._dragula.setOptions(this.draggerContainerName, {
            revertOnSpill: false
        });
        this._socket.joinRoom(this.user._id);
    }

    ngOnInit() {
        this._dragula.out
            .subscribe(value => {
                this.updateSchedule();
            });
    }

    ngOnDestroy() {
        this._dragula.destroy(this.draggerContainerName);
    }

    public logout = () => {
        this._session.clearUser();
        this._router.navigate(['/login']);
    }

    public calculateTimes = (medicine) => {
        const timeSplit = medicine.start_time.split(':');
        const startHour = +(timeSplit[0]);
        const minute = timeSplit[1];
        const hourArray = [];
        const hourDifference = Math.round(24 / medicine.day_frequence);
        const timeArray = Array(medicine.day_frequence).fill(startHour)
            .map((value, index) => {
                const hour = ((value + (index * hourDifference)) % 24);
                const hourString = hour < 10 ? '0' + hour : hour.toString();
                return `${hourString}:${minute}`;
            }).sort();
        return timeArray;
    }

    public updateSchedule = () => {
        console.log(this.user.schedule);
        this._scheduleBackendService.updateSchedule(this.user, this.user._id)
            .subscribe(res => {
                this._session.setUser(this.user);
            });
    }

    public openDialog(medicine?, arrayPosition?): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.data = {
            medicine: medicine,
            arrayPosition: arrayPosition
        };
        this.scheduleBlur = 'blur(1px)';

        const dialogRef = this._dialog.open(ScheduleDialogComponent, dialogConfig);

        dialogRef.afterClosed().subscribe(
            data => {
                console.log('Dialog output:', data);
                if (data) {
                    if (data.isNewMedicine) {
                        this.user.schedule.push(data.medicine);
                    } else {
                        this.user.schedule[data.arrayPosition] = data.medicine;
                    }
                    this.updateSchedule();
                }
                this.scheduleBlur = '';
            });
    }
}
