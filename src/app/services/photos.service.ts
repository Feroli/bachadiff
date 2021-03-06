import { Injectable, ViewChild, TemplateRef, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Http } from '@angular/http';

import {
  CalendarEvent, CalendarEventAction,
} from 'angular-calendar';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import { format, compareAsc, parse } from 'date-fns';
import { StateKey, makeStateKey, TransferState } from '@angular/platform-browser';
import { isPlatformServer } from '@angular/common';
import { Photo } from '../interfaces/photo';


@Injectable()
export class PhotosService {

  private ALBUM_PHOTOS_KEY: StateKey<number>;

  private classPicsUrl: string;
  private eventPicsUrl: string;

  private albumId: number;
  private PAGE_ID = 'Bachadiff';
  private ACCESS_TOKEN = `access_token=EAAZARnD23eboBAAZBcd6FZCNqxIN3tIqf5oFZBansdwYDAteRzIxWgRxeFFSwyrcEEZCin1NCMYwqaxr9ZBxA7hzabH4i8uAEBXNA1ZBtFTGZAXydg8SBzSFzYDz9s6Ec1ChQfIaYZB1T0hja2t2GyAqFOaLTsk2lOUQfig3w8MIwxAZDZD`;
  private EVENTS_QUERY = 'events'
  private PHOTOS_QUERY = 'albums?limit=1&fields=photos{height,width,id,images,album,link}';
  private PHOTOS20_QUERY = 'photos?limit=20&fields=images,id,link,height,width';
  private ALBUM_QUERY = 'photos?fields=images,id,link,height,width';
  private ALBUM_NAMES_QUERY = 'albums?limit=3&fields=description,name';
  private CLASSES_URL = 'https://bachadiff-classes-service.herokuapp.com/class-pictures/';
  private EVENTS_URL = 'https://bachadiff-events-service.herokuapp.com/event-pictures/';
  private colors: any = {
    red: {
      primary: '#ad2121',
      secondary: '#FAE3E3'
    },
    blue: {
      primary: '#1e90ff',
      secondary: '#D1E8FF'
    },
    yellow: {
      primary: '#e3bc08',
      secondary: '#FDF1BA'
    }
  };

  private modalData: {
    action: string;
    event: CalendarEvent;
  };


  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object, private transferState: TransferState) {

    this.ALBUM_PHOTOS_KEY = makeStateKey('albumPhotos');

    this.classPicsUrl = `${this.CLASSES_URL}`;
    this.eventPicsUrl = `${this.EVENTS_URL}`;

  }

  getPhotos(artist: string): Photo[] {
    
    let photos: Photo[] = [];

    if (artist === "Fernando Ania") {
        photos = [
            {
                id: 124, link: "https://s3.eu-west-2.amazonaws.com/bachadiff-profile/bachataStars.jpg", width: 123, height: 123, title: "string", caption: "string", etag: "string"
            },
            {
                id: 125, link: "https://s3.eu-west-2.amazonaws.com/bachadiff-profile/IMG_0944.jpg", width: 123, height: 123, title: "string", caption: "string", etag: "string"
            },
            {
              id: 126, link: "https://s3.eu-west-2.amazonaws.com/bachadiff-profile/labonita.jpg", width: 123, height: 123, title: "string", caption: "string", etag: "string"
            },
            {
              id: 126, link: "https://s3.eu-west-2.amazonaws.com/bachadiff-assets/bachadiffClassPic.jpg", width: 123, height: 123, title: "string", caption: "string", etag: "string"
            },
        ];
    } else if (artist == "Daniel") {
         photos = [
            {
                id: 123, link: "https://i.ytimg.com/vi/ViYDsPp6iAE/maxresdefault.jpg", width: 123, height: 123, title: "string", caption: "string", etag: "string"
            }
        ];
    } else {
        photos =  [];
    }

    this.transferState.set(this.ALBUM_PHOTOS_KEY, photos.length);  
    return photos;
  }

  getBachadiffEventPhotos(): Observable<Photo[]> {
    let eventPhotos: Photo[] = [];
    let eventPhoto: Photo;

    return this.http.get(this.eventPicsUrl)
      .map(res => res as Photo[])
      .map(photos => {

        for (let photo of photos) {
          eventPhotos.push(photo);
        }

        this.transferState.set(this.ALBUM_PHOTOS_KEY, photos.length);
        return eventPhotos;

      });
  }

  getBachadiffClassesPhotos(): Observable<Photo[]> {

    let classPhotos: Photo[] = [];

    return this.http.get(this.classPicsUrl)
      .map(res => res as Photo[])
      .map(photos => {
        for (let photo of photos) {
          classPhotos.push(photo);
        }

        this.transferState.set(this.ALBUM_PHOTOS_KEY, photos.length);
        return classPhotos;

      });
  }




}
