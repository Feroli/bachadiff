import { Component, OnInit } from '@angular/core';
import { Meta, Title } from "@angular/platform-browser";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  question: string;
  answer: string;



  constructor(private router: Router, meta: Meta, title: Title) {
    title.setTitle('Bachadiff Bachata Dance Classes in Cardiff Home page');

    let description = `This is the bachadiff welcome page for Cardiff bachata lovers. Specialised in the Cardiff Bachata/latin Scene
    with International Bachata Dancer Daniel Chong (Daniel and Pebbles) and the Bachadiff Team. Explore our site to learn more about Bachata in Cardiff in
    our top Bachata nights, meet our team, find our events, socialise with great Bachata dancers that commute Swansea, Bristol and London for
    our classes. This is a great opportunity to enjoy your night in a fun enviroment where you can improve your dance skills and have a great
    night.`;

    meta.addTags([
      { name: 'author', content: 'Fenando Ania' },
      { name: 'keywords', content: 'Bachata, bachadiff, Cardiff, Wales, Salsa, latin, dance' },
      { name: 'description', content: description },
      { name: "fragment", content: "!" },
      { property: "og:url", content: "http://bachadiff.co.uk/home/" },
      { property: "og:type", content: "Bachadiff Bachata Cardiff Home page" },
      { property: "og:title", content: "Bachadiff Bachata Dance Classes in Cardiff Home page" },
      { property: "og:description", content: description },
      { property: "og:image", content: "https://s3.eu-west-2.amazonaws.com/bachadiff-assets/genericPoster.jpg" }
    ]);
  }

  goToAbout() {
    this.router.navigateByUrl('/about');
  };

  ngOnInit() {
    this.question = "What is Bachata?"
    this.answer = "A social dance not a choreography"
  }

}
