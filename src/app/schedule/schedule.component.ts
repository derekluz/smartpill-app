import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Toast, ToasterContainerComponent, ToasterService, ToasterConfig } from 'angular2-toaster';
import { ScheduleBackendService } from './schedule-backend.service';
import { PushNotificationService, SessionService } from '../services/services';

@Component({
    selector: 'app-schedule',
    templateUrl: './schedule.component.html',
    styleUrls: ['./schedule.component.css']
})

export class ScheduleComponent {
    public user = {};
    public newMedicine = false;
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
        private _scheduleBackendService: ScheduleBackendService,
        private _router: Router,
        private _session: SessionService
    ) {
        this.user = this._session.getUser();
        if (!this.user) {
            this.logout();
        }
        console.log(this.user);
    }

    public logout = () => {
        this._session.clearUser();
        this._router.navigate(['/login']);
    }

    public calculateTimes = (medicine) => {
        const timeSplit = medicine.start_time.split(':');
        const startHour = timeSplit[0];
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

    public addMedicine = () => {
        this.newMedicine = true;
    }



}
