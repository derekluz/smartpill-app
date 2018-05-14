import { Injectable } from '@angular/core';
import { PushNotificationsService, PushNotification } from 'angular2-notifications';

@Injectable()
export class PushNotificationService {
    constructor(private _push: PushNotificationsService) { }

    requestPermitionLocalNotification = () => {
        if (this._push.isSupported()) {
            this._push.requestPermission();
        } else {
            alert('Your browser does not support push notifications');
            console.error('Your browser does not support push notifications');
        }
    }

    sendLocalNotification() {
        const options = {
            body: 'Remédio no dispensador',
            icon: 'assets/icons/pill.png',
            vibrate: [200, 100, 200]
        };
        const notify = this._push.create('Atenção!', options)
            .subscribe(
                res => console.log(res),
                err => console.log(err)
            );
    }
}
