import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';

export class User {
    userId: string;
    email: string;
    password: string;
    schedule: Object;
}

@Injectable()
export class SessionService {

    constructor(private _cookieService: CookieService) { }

    public clearSession = () => {
        this._cookieService.putObject('session', {});
    }

    public setSession = (user: User) => {
        this._cookieService.putObject('session', user);
    }

    public getSession = (): User => {
        const cookieSession = this._cookieService.getObject('session');
        if (cookieSession) {
            const session = Object.assign(new User, this._cookieService.getObject('session'));
            return session;
        }
        return undefined;
    }

}
