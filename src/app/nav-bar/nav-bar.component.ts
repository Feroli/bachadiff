import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';

@Component({
  selector: 'app-nav-bar',
  animations: [ routerTransition ],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor() { }

  getState(outlet) {
    return outlet.activatedRouteData.state;
  }

  ngOnInit() {
  }

}
