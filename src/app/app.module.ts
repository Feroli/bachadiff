import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import { CalendarModule } from 'angular-calendar';

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
    GalleryComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    appRoutes,
    BrowserAnimationsModule,
    CalendarModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC90CDCThfCncC8hQS21pIXzI7Znn65RgQ'
    })

  ],
  providers: [FacebookEventsService, GoogleAnalyticsEventsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
