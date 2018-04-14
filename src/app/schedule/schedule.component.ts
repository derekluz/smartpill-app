import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Toast, ToasterContainerComponent, ToasterService, ToasterConfig } from 'angular2-toaster';
import { UUID } from 'angular2-uuid';
import { ScheduleBackendService } from './schedule-backend.service';
import { PushNotificationService, SessionService } from '../services/services';

@Component({
    selector: 'schedule',
    templateUrl: './schedule.component.html',
    styleUrls: ['./schedule.component.css']
})

export class ScheduleComponent {
    public numbers = Array(5);
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
        private _route: ActivatedRoute,
        private _router: Router
    ) { }

    public redirect = () => {
        this._router.navigate(['/login']);
    }

}
