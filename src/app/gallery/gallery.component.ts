import { Component, OnInit, AfterViewInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { FacebookEventsService } from '../services/facebook-events.service';
import { FacebookPhoto } from '../interfaces/facebook-photo';
import { Observable } from 'rxjs/Observable';
import { Title, Meta } from '@angular/platform-browser';
declare var $;
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit, AfterViewInit, AfterViewChecked {

  @ViewChild('videoPlayer') videoPlayer: ElementRef;

  bachataVidsArray: Array<object>
  bachataPicsArray: FacebookPhoto[];
  carrousellIterator: Array<string>;
  hoveredId: number;
  depth5 = 'z-depth-5';
  depth1 = 'z-depth-1';
  constructor(private facebookService: FacebookEventsService, title: Title, meta: Meta) {

    title.setTitle('Bachadiff Bachata Dance Classes in Cardiff Gallery page');

    meta.addTags([
      { name: 'author', content: 'Fenando Ania' },
      { name: 'keywords', content: 'Bachata, bachadiff, cardiff, wales, salsa, latin, dance' },
      { name: 'description', content: 'Bachata dance classes videos and photos, from Bachadiff!' },
      { name: "fragment", content: "!" }

    ]);
  }



  mouseEnter(event: MouseEvent, id: number) {
    this.hoveredId = id;
    this.depth5 = event.type == 'mouseenter' ? 'z-depth-5' : 'z-depth-1';
  }

  mouseLeave(event: MouseEvent) {
    this.depth1 = 'z-depth-1';
    this.depth5 = 'z-depth-1';
  }


  play() {
    this.videoPlayer.nativeElement.paused ? this.videoPlayer.nativeElement.play() : this.videoPlayer.nativeElement.pause();
  }

  ngAfterViewChecked() {

    $('.materialboxed').materialbox();
  }

  ngAfterViewInit(): void {
    $('.carousel.carousel-slider').carousel({ fullWidth: true });
  }

  ngOnInit() {

    this.facebookService.getBachadiffFacebookVideos().subscribe(res => { this.bachataVidsArray = res; });
    this.facebookService.getBachadiffFacebookLastClassPictures().subscribe(res => this.bachataPicsArray = res);

    this.carrousellIterator = ['#one!', '#two!', '#three!', '#four!', '#five!'];
  }

}
