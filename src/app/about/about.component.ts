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

    let description = `This is the bachadiff welcome page for Cardiff bachata lovers. Specialised in the Cardiff Bachata/latin Scene
    with International Bachata Dancer Daniel Chong (Daniel and Pebbles) and the Bachadiff Team. Explore our site to learn more about Bachata in Cardiff in
    our top Bachata nights, meet our team, find our events, socialise with great Bachata dancers that commute Swansea, Bristol and London for
    our classes. This is a great opportunity to enjoy your night in a fun enviroment where you can improve your dance skills and have a great
    night.`;

    meta.addTags([
      { name: 'author', content: 'Fenando Ania' },
      { name: 'keywords', content: 'Bachata, bachadiff, cardiff, wales, salsa, latin, dance, classes' },
      { name: 'description', content: 'Meet the bachadiff team and our vision, and learn more about each dancer and their influence in the Cardiff Bachata dance scene!' },
      { name: "fragment", content: "!" },
      { name: "og:url", content: "http://bachadiff.co.uk/about/" },
      { name: "og:type", content: "Bachadiff bachata about page" },
      { name: "og:title", content: "Bachadiff Bachata Dance Classes in Cardiff About Page" },
      { name: "og:description", content: description },
      { name: "og:image", content: "https://s3.eu-west-2.amazonaws.com/bachadiff-assets/genericPoster.jpg" }


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
