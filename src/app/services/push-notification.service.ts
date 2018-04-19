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

    sendLocalNotification(noti: any) {
        if (this._push.isSupported()) {
            if (this._push.permission === 'granted') {
                navigator.serviceWorker.getRegistration()
                    .then((reg) => {
                        reg.showNotification(noti.title, noti);
                    })
                    .catch((err) => console.log(err));
            } else {
                this._push.requestPermission();
            }
        } else {
            alert('Your browser does not support push notifications');
            console.error('Your browser does not support push notifications');
        }
    }
}
