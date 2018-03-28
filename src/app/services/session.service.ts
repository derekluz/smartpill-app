import { Injectable } from '@angular/core';
import { CookieService, CookieOptions} from 'ngx-cookie';
import { UUID } from 'angular2-uuid';

export class Session {
    amilUserId: string
    amilUserName: string
    amilUserCpf: string
    amilUserPassword: string
    startTime: number
    status: number
    expiration: Date
    id: UUID
}

@Injectable()
export class SessionService {

    constructor(private _cookieService: CookieService) { }

    public setSession = (amilUser, currentDate: Date, sessionId: UUID, accessToken: string) => {
        const cookieExp = currentDate
        cookieExp.setHours(cookieExp.getHours() + 8);
        const session = new Session
        session.amilUserId = amilUser.healthuserId;
        session.amilUserName = amilUser.userName;
        session.amilUserCpf = amilUser.cpf;
        session.amilUserPassword = amilUser.password;
        session.startTime = Math.floor(+ currentDate / 1000);
        session.expiration = cookieExp;
        session.id = sessionId;
        this._cookieService.putObject('session', session, { expires: cookieExp });
    }

    public getSession = (): Session => {
        const cookieSession = this._cookieService.getObject('session');
        if (cookieSession) {
            const session = Object.assign(new Session, this._cookieService.getObject('session'));
            return session;
        }
        return undefined;
    }

    public getCredentials = () => {
        let session = this.getSession();
        if (session) {
            return {
                cpf: session.amilUserCpf,
                password: session.amilUserPassword
            };
        }
        else {
            return undefined;
        }
    }

    public setStatus = (newStatus: number) => {
        let session = this.getSession();
        session.status = newStatus;
        this._cookieService.putObject('session', session, { expires: session.expiration });
    }

    public clearSession = () => {
        this._cookieService.remove('session');
    }

    public getSessionId = (): UUID => {
        return this.getSession().id;
    }

}