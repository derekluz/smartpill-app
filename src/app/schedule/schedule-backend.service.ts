import { Observable } from "rxjs/Observable";
import { Injectable, Inject } from '@angular/core';
import { Http, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
import { UUID } from 'angular2-uuid';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';

@Injectable()
export class ScheduleBackendService {
  private _stormwindApi: string;
  constructor(
    private _http: Http
  ) {
    this._stormwindApi = environment.smartpillApiUrl + environment.smartpillApiVersion;
  }

  private _serverError = (err: any) => {
    console.log('doLogin error:', err);
    if (err instanceof Response) {
      return Observable.throw(err.text() || 'backend server error');
    }
    return Observable.throw(err || 'backend server error');
  }

}