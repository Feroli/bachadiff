import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ProfilePicture } from '../interfaces/profile-picture';
import { v4 as uuid } from 'uuid';

declare var $;
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  private fernandoFacebookUrl = 'https://www.facebook.com/Fer0li';
  private danielFacebookUrl = 'https://www.facebook.com/daniel.chong.908';
  private jasonFacebookUrl = 'https://www.facebook.com/jasondjjay.bachata.7';

  private profilePictures: ProfilePicture[];

  visionText: string;

  constructor(meta: Meta, title: Title) {
    title.setTitle('Bachadiff Bachata Dance Classes in Cardiff About Page');

    let description = `This is the bachadiff welcome page for Cardiff bachata lovers. Specialised in the Cardiff Bachata/latin Scene
    with International Bachata Dancer Daniel Chong (Daniel and Pebbles) and the Bachadiff Team. Explore our site to learn more about Bachata in Cardiff in
    our top Bachata nights, meet our team, find our events, socialise with great Bachata dancers that commute Swansea, Bristol and London for
    our classes. This is a great opportunity to enjoy your night in a fun enviroment where you can improve your dance skills and have a great
    night.`;

    meta.addTags([
      { property: 'og:url', content: 'http://bachadiff.co.uk/about/' },
      { property: 'og:type', content: 'Bachadiff bachata about page' },
      { property: 'og:title', content: 'Bachadiff Bachata Dance Classes in Cardiff About Page' },
      { property: 'og:description', content: description },
      { property: 'og:image', content: 'https://s3.eu-west-2.amazonaws.com/bachadiff-assets/genericPoster.jpg' },
      { name: 'fb:app_id', content: '1778581352446394' },
      { name: 'author', content: 'Fenando Ania' },
      { name: 'keywords', content: 'Bachata, bachadiff, cardiff, wales, salsa, latin, dance, classes' },
      { name: 'description', content: 'Meet the bachadiff team and our vision, and learn more about each dancer and their influence in the Cardiff Bachata dance scene!' },
      { name: 'fragment', content: '!' },



    ]);
  }

  goToFacebook(link: string) {
    window.open(link, '_blank');
  };

  findUs() {
    $('html, body').animate({
      scrollTop: $('.vision_container').offset().top
    })
  }

  ngOnInit() {



    this.profilePictures = [
      {
        id: uuid(),
        image: 'https://s3.eu-west-2.amazonaws.com/bachadiff-assets/ferPlaya.jpg',
        title: 'Fernando Ania',
        description: 'Bachata and Salsa Lover, Beatboxer and a great cook!',
        link: this.fernandoFacebookUrl
      },
      {

        id: uuid(),
        image: 'https://s3.eu-west-2.amazonaws.com/bachadiff-assets/daniel.jpg',
        title: 'Daniel Chong',
        description: 'Bachata Performer with unique style ChongChata, surprisingly flexible',
        link: this.danielFacebookUrl

      },
      {
        id: uuid(),
        image: 'https://s3.eu-west-2.amazonaws.com/bachadiff-assets/jason.jpg',
        title: 'DJ JAY',
        description: 'Crazy bachata and salsa guy, known as DJ Jay behind the deck',
        link: this.jasonFacebookUrl


      }
    ];

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
