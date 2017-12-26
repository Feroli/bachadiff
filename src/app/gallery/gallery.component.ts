import { Component, OnInit, AfterViewInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { FacebookEventsService } from '../services/facebook-events.service';
import { FacebookPhoto } from '../interfaces/facebook-photo';
import { Observable } from 'rxjs/Observable';
import { Title, Meta } from '@angular/platform-browser';
import { TransferState, makeStateKey } from '@angular/platform-browser';

declare var $;
const VIDEOS_KEY = makeStateKey('videos');
const LAST_CLASS_PICTURES_KEY = makeStateKey('lastClassPictures');
const ALBUM_NAMES_KEY = makeStateKey('albumNames');
const ALBUM_PHOTOS_KEY = makeStateKey('albumPhotos');

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit, AfterViewInit, AfterViewChecked {

  @ViewChild('videoPlayer') videoPlayer: ElementRef;

  videos: any;
  lastClassPictures: any;
  albumNames: any;
  albumPhotos: any;

  bachataVidsArray: Array<object>
  bachataPicsArray: any
  bachataAlbumHeaderNames: Array<object>

  hoveredId: number;
  depth5 = 'z-depth-5';
  depth1 = 'z-depth-1';
  constructor(private facebookService: FacebookEventsService, title: Title, meta: Meta, private state: TransferState) {

    title.setTitle('Bachadiff Bachata Dance Classes in Cardiff Gallery page');
    let description = 'Cardiff Bachata dance classes videos and photos, from Bachadiff!';

    meta.addTags([
      { property: "og:url", content: "http://bachadiff.co.uk/gallery/" },
      { property: "og:type", content: "Bachadiff bachata gallery page" },
      { property: "og:title", content: "Bachadiff Bachata Dance Classes in Cardiff Gallery Page" },
      { property: "og:description", content: description },
      { property: "og:image", content: "https://s3.eu-west-2.amazonaws.com/bachadiff-assets/genericPoster.jpg" },
      { name: "fb:app_id", content: "1778581352446394" },

      { name: 'author', content: 'Fenando Ania' },
      { name: 'keywords', content: 'Bachata, bachadiff, cardiff, wales, salsa, latin, dance' },
      { name: 'description', content: description },
      { name: "fragment", content: "!" },



    ]);
  }



  getAlbum(albumId: number) {

    this.albumPhotos = this.state.get(ALBUM_PHOTOS_KEY, null as any);
    console.log('albumPicss:  ', this.albumPhotos);


    if (!this.albumPhotos) {
      this.facebookService.getBachadiffAlbumPhotos(albumId).subscribe(res => {
        this.bachataPicsArray = res;

        this.state.set(ALBUM_PHOTOS_KEY, res as any);
      });
    }
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

  }

  ngOnInit() {
    $('ul.tabs').tabs();

    this.videos = this.state.get(VIDEOS_KEY, null as any);
    this.lastClassPictures = this.state.get(LAST_CLASS_PICTURES_KEY, null as any);
    this.albumNames = this.state.get(ALBUM_NAMES_KEY, null as any);

    if (!this.videos) {
      this.facebookService.getBachadiffFacebookVideos().subscribe(res => {
        this.bachataVidsArray = res;
        this.state.set(VIDEOS_KEY, res as any);
      });
    }

    if (!this.lastClassPictures) {
      this.facebookService.getBachadiffFacebookLastClassPictures().subscribe(res => {
        this.bachataPicsArray = res;
        this.state.set(LAST_CLASS_PICTURES_KEY, res as any);
      });
    }

    if (!this.albumNames) {
      this.facebookService.getBachadiffAlbumNames().subscribe(res => {
        this.bachataAlbumHeaderNames = res;
        this.state.set(ALBUM_NAMES_KEY, res as any);
      });
    }

  }

}
