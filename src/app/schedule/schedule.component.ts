import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { Toast, ToasterContainerComponent, ToasterService, ToasterConfig } from 'angular2-toaster';
import { ScheduleBackendService } from './schedule-backend.service';
import { PushNotificationService, SessionService } from '../services/services';
import { User } from '../models/user.model';


@Component({
    selector: 'app-schedule',
    templateUrl: './schedule.component.html',
    styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
    public user: User;
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
        private _dragula: DragulaService,
        private _router: Router,
        private _scheduleBackendService: ScheduleBackendService,
        private _session: SessionService
    ) {
        this.user = this._session.getUser();
        if (!this.user) {
            this.logout();
        }
        console.log(this.user);
        this._dragula.setOptions('bag-items', {
            revertOnSpill: false
        });
    }

    ngOnInit() {
        this._dragula
            .out
            .subscribe(value => {
                console.log(this.user.schedule);
                this._scheduleBackendService.updateSchedule(this.user, this.user._id);
            });
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

    public addMedicine = () => {
        this.newMedicine = true;
    }


}
