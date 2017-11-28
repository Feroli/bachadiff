import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { GoogleAnalyticsEventsService } from './services/google-analytics-events.service';
import { Title, Meta } from '@angular/platform-browser';
declare var ga;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public router: Router, public googleAnalyticsEventsService: GoogleAnalyticsEventsService, title: Title, meta: Meta) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        ga('set', 'page', event.urlAfterRedirects);
        ga('send', 'pageview');
      }
    });

    const description = `This is the bachadiff welcome page for Cardiff bachata lovers. Specialised in the Cardiff Bachata/latin Scene
    with International Bachata Dancer Daniel Chong (Daniel and Pebbles) and the Bachadiff Team. Explore our site to learn more about Bachata in Cardiff in
    our top Bachata nights, meet our team, find our events, socialise with great Bachata dancers that commute Swansea, Bristol and London for
    our classes. This is a great opportunity to enjoy your night in a fun enviroment where you can improve your dance skills and have a great
    night.`

    title.setTitle('Bachadiff Bachata Dance Classes in Cardiff Starting page');

    meta.addTags([
      { property: "og:url", content: "http://bachadiff.co.uk/" },
      { property: "og:type", content: "Site entry point" },
      { property: "og:title", content: "Bachadiff Bachata Dance Classes in Cardiff Starting page" },
      { property: "og:description", content: description },
      { property: "og:image", content: "https://s3.eu-west-2.amazonaws.com/bachadiff-assets/genericPoster.jpg" },
      { name: "fb:app_id", content: "1778581352446394"},
      { name: 'author', content: 'Fenando Ania' },
      { name: 'keywords', content: 'Bachata, bachadiff, cardiff, wales, salsa, latin, dance' },
      { name: 'description', content: description },
      { name: "fragment", content: "!" },

    ]);
  }
}
