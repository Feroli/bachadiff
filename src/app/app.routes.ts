import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ClassesComponent } from './classes/classes.component';
import { EventsComponent } from './events/events.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

const routes: Routes = [

  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'classes', component: ClassesComponent },
  { path: 'events', component: EventsComponent },
  { path: 'contactUs', component: ContactUsComponent },

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

export const appRoutes =
  RouterModule.forRoot(routes);
