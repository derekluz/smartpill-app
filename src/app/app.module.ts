import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { CookieModule, CookieService, CookieOptions } from 'ngx-cookie';
import { PushNotificationsModule } from 'angular2-notifications';
import { TextMaskModule } from 'angular2-text-mask';
import { ToasterModule, ToasterService } from 'angular2-toaster';
import { SwiperModule, SwiperConfigInterface, SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ScheduleDialogComponent } from './schedule-dialog/schedule-dialog.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginBackendService } from './login/login-backend.service';
import { ScheduleBackendService } from './schedule/schedule-backend.service';
import { PushNotificationService, SessionService, SocketService } from './services/services';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

const socketConfig: SocketIoConfig = {
  url: 'http://localhost:3000',
  options: {}
};

const SwiperProvider = {
  provide: SWIPER_CONFIG,
  useValue: DEFAULT_SWIPER_CONFIG
};

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatSliderModule,
  MatSnackBarModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatNativeDateModule,
} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ScheduleComponent,
    ScheduleDialogComponent
  ],
  entryComponents: [ScheduleDialogComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    DragulaModule,
    NoopAnimationsModule,
    CookieModule.forRoot(),
    FormsModule,
    HttpClientModule,
    HttpModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSnackBarModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatNativeDateModule,
    TextMaskModule,
    ToasterModule,
    PushNotificationsModule,
    ReactiveFormsModule,
    SocketIoModule.forRoot(socketConfig),
    SwiperModule
  ],
  providers: [
    CookieService,
    LoginBackendService,
    PushNotificationService,
    ScheduleBackendService,
    SessionService,
    SocketService,
    SwiperProvider,
    ToasterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
