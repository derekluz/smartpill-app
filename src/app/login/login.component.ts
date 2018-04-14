import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Toast, ToasterContainerComponent, ToasterService, ToasterConfig } from 'angular2-toaster';
import { UUID } from 'angular2-uuid';
import { LoginBackendService } from './login-backend.service';
import { PushNotificationService, SessionService } from '../services/services';
import {
  SwiperComponent, SwiperDirective, SwiperConfigInterface,
  SwiperScrollbarInterface, SwiperPaginationInterface
} from 'ngx-swiper-wrapper';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  public loginActive = true;
  public mask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]
  public myHeight: string;
  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      showCloseButton: false,
      tapToDismiss: true,
      timeout: 1500,
      animation: 'slideUp',
      limit: 1,
      positionClass: 'toast-bottom-center',
    });

  public swiperConfig: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 1,
    keyboard: true,
    mousewheel: true,
    scrollbar: true,
    navigation: false,
    pagination: false
  };

  constructor(
    private _loginBackendService: LoginBackendService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _toasterService: ToasterService,
    private _sessionService: SessionService,
    private _push: PushNotificationService
  ) {
    window.onresize = this._setHeight;
    this._setHeight();
    this._sessionService.clearSession();
  }

  doLogin(f: NgForm): void {
    if (!f.valid) {
      this._badLoginToast();
    }
    else {
      // this._loginBackendService.doLogin(f.value)
      //   .subscribe(
      //     result => {
      //       this._push.requestPermitionLocalNotification();
      //       result.healthuser.password = f.value.password;
      //       const sessionDate = new Date();
      //       const sessionId = UUID.UUID();
      //       const accessToken = result.accessToken;
      //       this._sessionService.setSession(result.healthuser, sessionDate, sessionId, accessToken);
      //       this._router.navigate(['/main', {
      //         outlets: {
      //           'main': ['dashboard']
      //         }
      //       }]);

      //       let request: any = { action: 'login', healthuserId: result.healthuser.healthuserId };
      //       // this._loginBackendService.auditLogin(request)
      //       //   .subscribe(
      //       //     result => {
      //       //       return result;
      //       //     });
      //     },
      //     error => {
      //       this._badLoginToast();
      //     });
    }
  }

  private _badLoginToast() {
    this._toasterService.pop('error', '', 'Usuário ou senha inválidos');
  }

  private _setHeight() {
    if (window.screen.height - 200 < window.innerHeight) {
      this.myHeight = window.innerHeight + 'px';
    } else {
      this.myHeight = window.screen.height + 'px';
    }
  }

  public toggleLoginView = () => {
    console.log('button clicked')
    this.loginActive = !this.loginActive;
    this._router.navigate(['/schedule']);
  }



}
