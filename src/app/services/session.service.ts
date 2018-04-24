import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { User, UserObject } from '../models/user.model';

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
            const user = Object.assign(new UserObject, this._cookieService.getObject('user'));
            return user;
        }
        return undefined;
    }

}
