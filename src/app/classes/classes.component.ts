import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
declare var $;

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {

  lat: number = 51.477746;
  lng: number = -3.178054;
  zoom: number = 19;

  hover_poster = '';

  constructor(meta: Meta, title: Title) {
    title.setTitle('Bachadiff Classes Page');

    meta.addTags([
      { name: 'author', content: 'Fenando Ania' },
      { name: 'keywords', content: 'Bachata, bachadiff, cardiff, wales, salsa, latin, dance' },
      { name: 'description', content: 'This page describes the structure of our classes and where we are!' }
    ]);
  }

  findUs() {
    $('html, body').animate({
      scrollTop: $('.location_text').offset().top
    })
  }
  mouseEnter($event: MouseEvent) {
    this.hover_poster = $event.type == 'mouseenter' ? 'hover_poster z-depth-5': '';

  }

  mouseLeave($event: MouseEvent) {
    this.hover_poster = $event.type == 'mouseleave' ? '': 'hover_poster z-depth-5';

  }

  ngOnInit() {
  }

}
