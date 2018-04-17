import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { CookieModule, CookieService, CookieOptions } from 'ngx-cookie';
import { PushNotificationsService, PushNotification } from 'angular2-notifications';
import { TextMaskModule } from 'angular2-text-mask';
import { ToasterModule, ToasterService } from 'angular2-toaster';
import { SwiperModule, SwiperConfigInterface, SWIPER_CONFIG } from 'ngx-swiper-wrapper';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginBackendService } from './login/login-backend.service';
import { ScheduleBackendService } from './schedule/schedule-backend.service';
import { PushNotificationService, SessionService } from './services/services';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
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
    ScheduleComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
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
    ReactiveFormsModule,
    SwiperModule
  ],
  providers: [
    CookieService,
    LoginBackendService,
    PushNotificationService,
    PushNotificationsService,
    ScheduleBackendService,
    SessionService,
    SwiperProvider,
    ToasterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
