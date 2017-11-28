import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
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

  constructor(meta: Meta, title: Title) {
    title.setTitle('Bachadiff Bachata Dance Classes in Cardiff About Page');

    meta.addTags([
      { name: 'author', content: 'Fenando Ania' },
      { name: 'keywords', content: 'Bachata, bachadiff, cardiff, wales, salsa, latin, dance, classes' },
      { name: 'description', content: 'Meet the bachadiff team and our vision, and learn more about each dancer and their influence in the Cardiff Bachata dance scene!' },
      { name: "fragment", content: "!" }
    ]);
  }

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
    The BachaDIFF team focus will be for Bachata Social Dancing and we aim to highlight the music,
    culture and flow of the dance and most importantly to produce high quality dancers through quality
    teaching and attention to the basics and fundamentals focusing on concepts of movement, in a super FUN learning environment.

    <h5>Daniel Chong</h5>

    <p>An international dance teacher/performer who travels across Europe to teach bachata from beginner to advance levels. He is also
    run the succesful monthly party BOS (Bachata On Saturday) in London, which accrues 400 - 500 people on the night.</p>

    <h5>Fernando Ania</h5>

    <p>Bachata dancer taught primarily by Daniel Chong and by other professional dancers.</p>

    <h5>Jason DJ JAY</h5>

    <p>Bachata dancer and DJ taught by teachers from all around the world.</p>
    `;
  }

}
