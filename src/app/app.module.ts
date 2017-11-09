import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { appRoutes } from './app.routes';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AboutComponent } from './about/about.component';
import { ClassesComponent } from './classes/classes.component';
import { EventsComponent } from './events/events.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    AboutComponent,
    ClassesComponent,
    EventsComponent,
    ContactUsComponent
  ],
  imports: [
    BrowserModule,
    appRoutes,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC90CDCThfCncC8hQS21pIXzI7Znn65RgQ'
    })

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
