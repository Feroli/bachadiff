import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ProfilePicture } from '../interfaces/profile-picture';
import { v4 as uuid } from 'uuid';
import { VideoService } from '../video.service/video-service'
import { PhotosService } from '../services/photos.service'
import { isPlatformServer, isPlatformBrowser } from '@angular/common';
import { Lightbox, IAlbum } from 'angular2-lightbox';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { Photo } from '../interfaces/photo';


declare var $;
const PHOTOS_KEY = makeStateKey('Photos');

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  
  private fernandoFacebookUrl = 'https://www.facebook.com/Fer0li';
  private danielFacebookUrl = 'https://www.facebook.com/daniel.chong.908';
  private jasonFacebookUrl = 'https://www.facebook.com/jasondjjay.bachata.7';

  private FERNANDO_INTRO = 'Fernando Ania Born in Santo Domingo, capital of the Dominican republic, and 2nd place winner of Bachata Stars Wales. Fernando experienced sensual bachata for the first time when he arrived in London, where he could learn from world renowned dancers, and had access to some of the biggest congresses in the U.K. Here he developed his style as a sensual dancer with a Dominican "meneo". In addition to bachata he explored other music genres such as hip hop and salsa, building his foundation as a dancer. Fast forward a few years he moved to Cardiff and started teaching, with a strong emphasis social dancing, and the Dominican ideologies of bachata.';
  private JSON_INTRO = '';
  private DANIEL_INTRO = '';

  intro: string;
  
  profilePictures: ProfilePicture[];
  bachataVideos = [];
  photos = [];
  album: Array<IAlbum>;  
  personalPictures: any;

  hoveredId: number;
  selectedTabIndex: number;
  visionText: string;
  depth5 = 'z-depth-5';
  depth1 = 'z-depth-1';
  media = "";

  constructor(meta: Meta, title: Title,
    private videoService: VideoService,
    private photoService: PhotosService,
    private state: TransferState,
    @Inject(PLATFORM_ID) private platformId: Object,
    private lightbox: Lightbox) {

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

  openEventPic(index) {
    if (isPlatformBrowser(this.platformId)) {
      // this.lightbox.open(this.album, index);
      window.open(this.album[index]["link"], '_blank');

    } else {
      window.open(this.album[index]["link"], '_blank');
    }
  }

  mouseEnter(event: MouseEvent, id: number) {
    this.hoveredId = id;
    this.depth5 = event.type == 'mouseenter' ? 'mat-elevation-z7' : 'mat-elevation-z2';
  }

  mouseLeave(event: MouseEvent) {
    this.depth1 = 'mat-elevation-z1';
    this.depth5 = 'mat-elevation-z1';
  }

  getProfile(artist: string) {
    if (artist === "Fernando Ania") {
      this.intro = this.FERNANDO_INTRO
    } else if (artist === "Daniel Chong") {
      this.intro = this.DANIEL_INTRO
    } else if (artist === "DJ JAY") {
      this.intro = this.JSON_INTRO
    } else { "" }

    this.media = "Media";
    this.photos = this.photoService.getPhotos(artist);
    this.bachataVideos = this.videoService.getVideos(artist);
  }


  ngOnInit() {

    this.bachataVideos = [];
    this.personalPictures = this.state.get(PHOTOS_KEY, null as any);    

    this.profilePictures = [
      {
        id: uuid(),
        image: 'https://s3.eu-west-2.amazonaws.com/bachadiff-assets/IMG_0937.jpg',
        title: 'Fernando Ania',
        description: 'Dominican born, Bachata Stars U.K Finalist and performer, focus is body movement.',
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
        description: 'Crazy bachata and salsa artist, known as DJ Jay behind the deck.',
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
