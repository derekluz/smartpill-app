import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';
import { PushNotificationService } from './push-notification.service';

@Injectable()
export class SocketService {
    private _events = {
        joinRoom: 'join-room',
        alert: 'alert'
    };

    constructor(
        private _socket: Socket,
        private _push: PushNotificationService
    ) {
        this.getAlert()
            .subscribe(() => {
                this._push.sendLocalNotification();
                console.log('ALERTA! Remédio no dispenser.');
            });
    }

    public joinRoom = (userId) => {
        console.log(`Join-room for userId:${userId}`);
        this._socket.emit(this._events.joinRoom, userId);
    }

    public getAlert = () => {
        return this._socket
            .fromEvent('alert');
    }
}
