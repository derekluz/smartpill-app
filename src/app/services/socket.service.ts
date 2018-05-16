import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';
import { PushNotificationService } from './push-notification.service';
import { SessionService } from './session.service';

@Injectable()
export class SocketService {
    private _events = {
        joinRoom: 'join-room',
        alert: 'alert'
    };

    constructor(
        private _session: SessionService,
        private _socket: Socket,
        private _push: PushNotificationService
    ) {
        this.getAlert()
            .subscribe(() => {
                this._push.sendLocalNotification();
                console.log('ALERTA! Remédio no dispenser.');
            });
        this._socket.on('connect', () => {
            console.log('connected to server');
            const user = this._session.getUser();
            if (user) {
                this.joinRoom(user._id);
            }

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
