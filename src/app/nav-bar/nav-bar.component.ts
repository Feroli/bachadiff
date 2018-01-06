import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { routerTransition } from '../router.animations';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-nav-bar',
  animations: [routerTransition],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  @Output() sideNav = new EventEmitter<boolean>();



  constructor() { }

  navOpen() {

    this.sideNav.emit(true);
  }

  toggleSideNav() {
    console.log(this.sideNav);

    // this.sideNav.open();
  }
  getState(outlet) {
    return outlet.activatedRouteData.state;
  }

  ngOnInit() {
  }

}
