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

    public clearUser = () => {
        this._cookieService.putObject('user', undefined);
    }

    public setUser = (user: User) => {
        this._cookieService.putObject('user', user);
    }

    public getUser = (): User => {
        const cookieSession = this._cookieService.getObject('user');
        if (cookieSession) {
            const user = Object.assign(new User, this._cookieService.getObject('user'));
            return user;
        }
        return undefined;
    }

}
