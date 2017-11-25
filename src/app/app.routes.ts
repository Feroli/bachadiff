import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ClassesComponent } from './classes/classes.component';
import { EventsComponent } from './events/events.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { GalleryComponent } from './gallery/gallery.component';

const routes: Routes = [

  { path: 'home', component: HomeComponent, data: { state: 'home' } },
  { path: 'about', component: AboutComponent, data: { state: 'about' } },
  { path: 'classes', component: ClassesComponent, data: { state: 'classes' } },
  { path: 'events', component: EventsComponent, data: { state: 'events' } },
  { path: 'gallery', component: GalleryComponent, data: { state: 'gallery' } },
  { path: 'contactUs', component: ContactUsComponent, data: { state: 'contactUs' } },

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

export const appRoutes =
  RouterModule.forRoot(routes);
