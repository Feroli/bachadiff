import { Component, OnInit } from '@angular/core';
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

  constructor() { }

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
