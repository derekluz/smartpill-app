import { Component, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
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

  public loginForm: any;
  public signUpForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _loginBackendService: LoginBackendService,
    private _router: Router,
    private _toasterService: ToasterService,
    private _sessionService: SessionService,
    private _push: PushNotificationService
  ) {
    window.onresize = this._setHeight;
    this._setHeight();
    this._sessionService.clearSession();
    this._prepareForms();
  }

  public doLogin(): void {
    if (!this.loginForm.valid) {
      this._badLoginToast();
      this.loginForm.reset();
    }
    else {
      console.log('UHUUUUUL')
      // this._loginBackendService.doLogin(form.value)
      //   .subscribe(
      //     result => {
      //       this._push.requestPermitionLocalNotification();
      //       result.healthuser.password = form.value.password;
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

  public doSignUp = () => {
    if (!this.signUpForm.valid) {
      this._badLoginToast();
      this.signUpForm.reset();
      this._router.navigate(['/schedule']);
    }
    else {
      this._router.navigate(['/schedule']);
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

  private _prepareForms = () => {
    const emailControl = ['', [
      Validators.required,
      Validators.pattern('[^ @]*@[^ @]*')]
    ];
    const passwordControl = ['', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20)]
    ];

    this.loginForm = this._formBuilder.group({
      'email': emailControl,
      'password': passwordControl
    });

    this.signUpForm = this._formBuilder.group({
      'email': emailControl,
      'password': passwordControl,
      'confirmPassword': passwordControl
    }, { validators: this._passwordMatchValidator });
  }

  private _passwordMatchValidator = (form: FormGroup) => {
    return form.get('password').value === form.get('confirmPassword').value ? null : { 'mismatch': true };
  }

}
