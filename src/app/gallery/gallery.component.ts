import { Component, OnInit, AfterViewInit, AfterViewChecked, ElementRef, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { PhotosService } from '../services/photos.service';
import { Observable } from 'rxjs/Observable';
import { Title, Meta } from '@angular/platform-browser';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { isPlatformServer, isPlatformBrowser } from '@angular/common';
import { Lightbox, IAlbum } from 'angular2-lightbox';
import { Photo } from '../interfaces/photo';

/**
 * Screen for displaying multimedia.
 * @author Feroli
 */

declare var $;
const VIDEOS_KEY = makeStateKey('videos');
const CLASS_PICTURES_KEY = makeStateKey('ClassPictures');
const EVENT_PICTURES_KEY = makeStateKey('EventPictures');

const ALBUM_NAMES_KEY = makeStateKey('albumNames');
const ALBUM_PHOTOS_KEY = makeStateKey('albumPhotos');

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit, AfterViewInit, AfterViewChecked {

  @ViewChild('videoPlayer') videoPlayer: ElementRef;
  @ViewChild('albumId') albumId: ElementRef

  classAlbum: Array<IAlbum>
  eventAlbum: Array<IAlbum>
  EVENT_ALBUM = 'EVENT_ALBUM';
  CLASS_ALBUM = 'CLASS_ALBUM';
  eventPicsIterator = [];
  classPicsIterator = [];
  private classPicCounter: number;
  private eventPicCounter: number;
  videos: any;
  classPictures: any;
  eventPictures: any;
  albumNames: any;
  albumPhotos: any;

  bachataVidsArray: Array<object>;
  classPics: Photo[];
  eventPics: Photo[];
  bachataAlbumHeaderNames: Array<object>;
 
  currentTabId: number;

  hoveredId: number;
  selectedTabIndex: number;

  depth5 = 'z-depth-5';
  depth1 = 'z-depth-1';
  constructor(private photosService: PhotosService, title: Title, meta: Meta,
    private state: TransferState, @Inject(PLATFORM_ID) private platformId: Object, private lightbox: Lightbox) {

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

  openClassPic(index) {

    if (isPlatformBrowser(this.platformId)) {
      this.lightbox.open(this.classAlbum, index);

    } else {
      window.open(this.classAlbum[index]["src"], '_blank');
    }
  }

  openEventPic(index) {
    if (isPlatformBrowser(this.platformId)) {
      this.lightbox.open(this.eventAlbum, index);

    } else {
      window.open(this.eventAlbum[index]["src"], '_blank');
    }
  }

  leftTab(albumType: String) {
    if (this.selectedTabIndex < 1) {
      this.selectedTabIndex = 2;
    }
    else {
    this.selectedTabIndex--;

    }
    this.getAlbum(this.selectedTabIndex, albumType);
  }

  rightTab(albumType: String) {
    if (this.selectedTabIndex > 1) {
      this.selectedTabIndex = 0;
    }
    else {
      this.selectedTabIndex++;

    }
    this.getAlbum(this.selectedTabIndex, albumType);
  }

  getAlbum(tabId: number, albumType: String) {

    if (isPlatformBrowser(this.platformId)) {

      if (albumType === this.CLASS_ALBUM) {
          this.photosService.getBachadiffClassesPhotos().subscribe(res => {
            this.currentTabId = tabId;
            this.classPics = res;
            this.createAlbum(this.classPics, albumType);
            // this.classPicCounter = this.classAlbum.length/20; 
            // this.classPicsIterator = new Array(this.classPicCounter).fill(1);
            // console.log("how many tabs for the classes: ", this.classPicsIterator)
                       
          });

        } else {
          this.photosService.getBachadiffEventPhotos().subscribe(res => {
            this.currentTabId = tabId;
            this.eventPics = res;
            this.createAlbum(this.eventPics, albumType);
            // this.eventPicCounter = this.eventAlbum.length/20;
            // this.eventPicsIterator = new Array(this.eventPicCounter).fill(1)            
          });
        }
    } else {

      console.log('In ', this.platformId ,' mode');
    }
  }

  private createAlbum(pics: Photo[], albumType: String) {

    if (albumType === this.EVENT_ALBUM) {
      this.eventAlbum = this.generateAlbum(pics, this.eventAlbum);
    } else {
      this.classAlbum = this.generateAlbum(pics, this.classAlbum);
    }

  }
  
  /**
   * Processs the array of pictures and populates the given global array.
   * @param pics  the list of photos
   * @param album  the album to put the photos into
   * @return the populated album
   */
  private generateAlbum(pics: Photo[], album: Array<IAlbum>): Array<IAlbum> {
    album = [];
    for (let photo of pics) {
      const albumPhoto = {
        src: photo.link,
        caption: photo.caption,
        thumb: photo.link
      };
      album.push(albumPhoto);    
  }

  return album;
}

  mouseEnter(event: MouseEvent, id: number) {
    this.hoveredId = id;
    this.depth5 = event.type == 'mouseenter' ? 'mat-elevation-z7' : 'mat-elevation-z2';
  }

  mouseLeave(event: MouseEvent) {
    this.depth1 = 'mat-elevation-z1';
    this.depth5 = 'mat-elevation-z1';
  }


  play() {
    this.videoPlayer.nativeElement.paused ? this.videoPlayer.nativeElement.play() : this.videoPlayer.nativeElement.pause();
  }

  ngAfterViewChecked() {}

  ngAfterViewInit(): void {}

  ngOnInit() {

    this.selectedTabIndex = 0;

    this.videos = this.state.get(VIDEOS_KEY, null as any);
    this.classPictures = this.state.get(CLASS_PICTURES_KEY, null as any);
    this.eventPictures = this.state.get(EVENT_PICTURES_KEY, null as any);
    this.albumNames = this.state.get(ALBUM_NAMES_KEY, null as any);

    this.photosService.getBachadiffClassesPhotos().subscribe(res => {
      this.classPics = res;
      this.state.set(CLASS_PICTURES_KEY, res as any);
      this.createAlbum(this.classPics, this.CLASS_ALBUM);
      this.classPicCounter = this.classAlbum.length/20;
      this.classPicsIterator = new Array(this.classPicCounter).fill(1)  
      console.log("iterator at init", this.classPicsIterator);          
      
    });

    this.photosService.getBachadiffEventPhotos().subscribe(res => {
      this.eventPics = res;
      this.state.set(EVENT_PICTURES_KEY, res as any);
      this.createAlbum(this.eventPics, this.EVENT_ALBUM);
      this.eventPicCounter = this.eventAlbum.length/20;
      this.eventPicsIterator = new Array(this.eventPicCounter).fill(1)                  
    });


  }



}
