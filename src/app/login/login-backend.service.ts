import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';

@Injectable()
export class LoginBackendService {

  private _smartpillApiUrl: string;

  constructor(
    private _http: Http
  ) {
    this._smartpillApiUrl = environment.smartpillApiUrl;
  }

  private _serverError = (err: any, functionName: string) => {
    console.error('[SharedDataService.' + functionName + '] error:', err);
    if (err instanceof Response) {
      return Observable.throw(err.text() || 'backend server error');
    }
    return Observable.throw(err || 'backend server error');
  }

  public doLogin = (userCredentials): Observable<any> => {
    const endpoint = `${this._smartpillApiUrl}/login/`;
    return this._http.post(endpoint, userCredentials)
      .map( (data: any) => {
        return data.json();
      })
      .do(data => console.log('[SharedDataService.doLogin] server data: ', data))
      .catch(err => this._serverError(err, 'doLogin'));
  }

}
