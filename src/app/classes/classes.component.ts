import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
declare var $;

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit {

  lat: number = 51.477746;
  lng: number = -3.178054;
  zoom: number = 19;

  hover_poster = '';

  constructor(meta: Meta, title: Title) {
    title.setTitle('Bachadiff Bachata Dance Classes in Cardiff Classes Page');

    let description = 'This page describes the structure of our Bachata Cardiff classes and where we are!';
    meta.addTags([
      { property: "og:url", content: "http://bachadiff.co.uk/classes/" },
      { property: "og:type", content: "Bachadiff bachata classes page" },
      { property: "og:title", content: "Bachadiff Bachata Dance Classes in Cardiff Classes Page" },
      { property: "og:description", content: description },
      { property: "og:image", content: "https://s3.eu-west-2.amazonaws.com/bachadiff-assets/genericPoster.jpg" },
      { name: "fb:app_id", content: "1778581352446394"},
      { name: 'author', content: 'Fenando Ania' },
      { name: 'keywords', content: 'Bachata, bachadiff, cardiff, wales, salsa, latin, dance, classes' },
      { name: 'description', content: 'This page describes the structure of our Bachata Cardiff classes and where we are!' },
      { name: "fragment", content: "!" },


    ]);
  }

  findUs() {

  }
  mouseEnter($event: MouseEvent) {
    this.hover_poster = $event.type == 'mouseenter' ? 'hover_poster mat-elevation-z8' : '';

  }

  mouseLeave($event: MouseEvent) {
    this.hover_poster = $event.type == 'mouseleave' ? '' : 'hover_poster mat-elevation-z8';

  }

  ngOnInit() {
  }

}
