import { Component, OnDestroy } from '@angular/core';
import { routerTransition } from '../router.animations';

declare var $;
@Component({
  selector: 'app-side-nav',
  animations: [ routerTransition ],
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnDestroy {


  getState(outlet) {
    return outlet.activatedRouteData.state;
  }

  constructor() {

  }

  ngOnDestroy(): void {

  }
}
