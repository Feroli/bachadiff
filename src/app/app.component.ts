import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { routerTransition } from './router.animations';

@Component({
  selector: 'app-root',
  animations: [routerTransition],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  navItems: Array<object>;

  constructor() { }

  getState(outlet) {
    return outlet.activatedRouteData.state;
  }

  ngOnInit(): void {

    this.navItems = [
      {
        title: 'Home',

      },
      {
        title: 'About'
      },
      {
        title: 'Classes'
      },
      {
        title: 'Events'
      },
      {
        title: 'Gallery'
      },
      {
        title: 'ContactUs'
      }
    ];

  }


}
