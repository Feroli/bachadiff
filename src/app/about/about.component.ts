import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  private fernandoFacebookUrl = 'https://www.facebook.com/Fer0li';
  private danielFacebookUrl = 'https://www.facebook.com/daniel.chong.908';
  private jasonFacebookUrl = 'https://www.facebook.com/jasondjjay.bachata.7';

  constructor() { }

  goToFernandoFacebook() {
    window.open(this.fernandoFacebookUrl, '_blank');
  };

  goToDanielFacebook() {
    window.open(this.danielFacebookUrl, '_blank')
  };

  goToJasonFacebook() {
    window.open(this.jasonFacebookUrl, '_blank')
  }

  ngOnInit() {
  }

}
