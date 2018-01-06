import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, } from '@angular/common/http';
import { TransferHttpCacheModule } from '@nguniversal/common'
import { CalendarModule } from 'angular-calendar';
import { FlexLayoutModule } from '@angular/flex-layout';;

import {
  MatSidenavModule,
  MatExpansionModule,
  MatGridListModule,
  MatButtonModule,
  MatTooltipModule,
  MatToolbarModule,
  MatTabsModule,
  MatListModule,
  MatMenuModule,
  MatSidenavModule,
  MatIconModule,
  MatCardModule,
  MatDialogModule
} from '@angular/material';

import { LightboxModule } from 'angular2-lightbox';


import { appRoutes } from './app.routes';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AboutComponent } from './about/about.component';
import { ClassesComponent } from './classes/classes.component';
import { EventsComponent } from './events/events.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

import { AgmCoreModule } from '@agm/core';
import { CalendarComponent } from './calendar/calendar.component';
import { FacebookEventsService } from './services/facebook-events.service';
import { SideNavComponent } from './side-nav/side-nav.component';
import { GoogleAnalyticsEventsService } from './services/google-analytics-events.service';
import { GalleryComponent } from './gallery/gallery.component';
import { MatDialogComponent } from './mat-dialog/mat-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    AboutComponent,
    ClassesComponent,
    EventsComponent,
    ContactUsComponent,
    CalendarComponent,
    SideNavComponent,
    GalleryComponent,
    MatDialogComponent
  ],
  entryComponents: [
    MatDialogComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'bachadiff' }),
    TransferHttpCacheModule,
    BrowserAnimationsModule,
    HttpClientModule,
    appRoutes,
    BrowserAnimationsModule,
    CalendarModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC90CDCThfCncC8hQS21pIXzI7Znn65RgQ'
    }),
    BrowserTransferStateModule,
    MatSidenavModule,
    MatExpansionModule,
    MatGridListModule,
    MatTooltipModule,
    MatButtonModule,
    MatMenuModule,
    MatListModule,
    MatTabsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    FlexLayoutModule,
    LightboxModule
  ],

  exports: [
    MatSidenavModule,
    MatExpansionModule,
    MatGridListModule,
    MatButtonModule,
    MatListModule,
    MatTooltipModule,
    MatTabsModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule

  ],
  providers: [FacebookEventsService, GoogleAnalyticsEventsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
