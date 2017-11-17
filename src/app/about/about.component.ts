import { Component, OnInit } from '@angular/core';
declare var $;
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  private fernandoFacebookUrl = 'https://www.facebook.com/Fer0li';
  private danielFacebookUrl = 'https://www.facebook.com/daniel.chong.908';
  private jasonFacebookUrl = 'https://www.facebook.com/jasondjjay.bachata.7';

  visionText: string;

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

  findUs() {
    $('html, body').animate({
      scrollTop: $('.vision_container').offset().top
    })
  }

  ngOnInit() {
    this.visionText = `
    The BachaDIFF team focus will be for Bachata Social Dancing and we aim to highlight the music, culture and flow of the dance and most importantly to produce high quality dancers through quality teaching and attention to the basics and fundamentals focusing on concepts of movement, in a super FUN learning environment.
    `
  }

}
