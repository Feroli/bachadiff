import { Injectable, ViewChild, TemplateRef, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Http } from '@angular/http';

import {
  CalendarEvent, CalendarEventAction,
} from 'angular-calendar';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { FacebookPhoto } from '../interfaces/facebook-photo';
import { FacebookVideo } from '../interfaces/facebook-video';

import { format, compareAsc, parse } from 'date-fns';
import { StateKey, makeStateKey, TransferState } from '@angular/platform-browser';
import { isPlatformServer } from '@angular/common';


@Injectable()
export class FacebookEventsService {


  private ALBUM_PHOTOS_KEY: StateKey<number>;

  private facebookEventsUrl: string;
  private facebookVideosUrl: string;
  private facebookPhotosUrl: string;
  private facebookAlbumNamesUrl: string;
  private facebookAlbumPhotosUrl: string;
  private albumId: number;
  private pageId = 'Bachadiff'
  private accessToken = `EAAZARnD23eboBACEetQ2zFT0nIfZCVzuZAJ0EzPxZCiM3wnmbZCOzMIgGwe0ZB5RIvh5mPWB6HmCGSZCducc5djpIVQe5ZCeZAoGLRP7yZBxNxtAAGd6Jfq1osBCZA9CZABm7U03Wwut6ZACETADZBZCt9ZCul3KKmeSmxqL1TSFe9NgKirISgZDZD`;

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

    this.facebookEventsUrl = `
      https://graph.facebook.com/v2.11/${this.pageId}/events?access_token=${this.accessToken}
      `;

    this.facebookVideosUrl = `
      https://graph.facebook.com/v2.11/${this.pageId}/videos?limit=3&fields=source&access_token=${this.accessToken}
      `;

    this.facebookPhotosUrl = `
      https://graph.facebook.com/v2.11/${this.pageId}/albums?limit=1&fields=photos{height,width,id,images,album,link}&access_token=${this.accessToken}
      `;
    1284348021696023

    this.facebookAlbumPhotosUrl = `https://graph.facebook.com/v2.11/${this.albumId}/photos?fields=images,id,link,height,width&access_token=${this.accessToken}`;

    this.facebookAlbumNamesUrl = `https://graph.facebook.com/v2.11/${this.pageId}/albums?limit=3&fields=description,name&access_token=${this.accessToken}`;
  }

  getBachadiffFacebookVideos(): Observable<FacebookVideo[]> {
    return this.http.get(this.facebookVideosUrl)
      .map(res => {
        let facebookVideos: FacebookVideo[] = [];
        let facebookVideo: FacebookVideo;

        let facebookVideoData = res['data'];

        for (let video of facebookVideoData) {
          facebookVideos.push(
            facebookVideo = {
              source: video.source
            })
        }

        return facebookVideos;
      })
  }

  getBachadiffAlbumNames(): Observable<object[]> {

    let albumHeaderNames: object[] = [];
    let albumHeader: object;
    return this.http.get(this.facebookAlbumNamesUrl)
      .map(res => {

        let facebookHeaderData = res['data'];

        for (let header of facebookHeaderData) {

          if (header['name'] === 'Profile Pictures' || header['name'] === 'Cover Photos' || header['name'] === "Mobile Uploads") {
            continue;
          } else {

            albumHeaderNames.push(
              albumHeader = {
                'name': header['name'].split('|')[1],
                'description': header['description'],
                'id': header['id']
              }
            );
          }

        }

        return albumHeaderNames;

      })
  };

  getBachadiffAlbumPhotos(albumId: number): Observable<FacebookPhoto[]> {

    this.albumId = albumId;
    this.facebookAlbumPhotosUrl = `https://graph.facebook.com/v2.11/${this.albumId}/photos?limit=20&fields=images,id,link,height,width&access_token=${this.accessToken}`;

    let facebookPhotos: FacebookPhoto[] = [];
    let facebookPhoto: FacebookPhoto;
    return this.http.get(this.facebookAlbumPhotosUrl)
      .map(res => {

        let facebookPhotoData = res['data'];

        for (let photo of facebookPhotoData) {

          facebookPhotos.push(
            facebookPhoto = {
              id: photo.id,
              image: photo.images[3].source,
              link: photo.link,
              height: photo.height,
              width: photo.width
            })
        }
        this.transferState.set(this.ALBUM_PHOTOS_KEY, res);
        return facebookPhotos;

      });

  }

  getBachadiffFacebookLastClassPictures(): Observable<FacebookPhoto[]> {

    let facebookPhotos: FacebookPhoto[] = [];
    let facebookPhoto: FacebookPhoto;
    return this.http.get(this.facebookPhotosUrl)
      .map(res => {


        let facebookPhotoData = res['data'][0]['photos']['data'];




        for (let photo of facebookPhotoData) {

          facebookPhotos.push(
            facebookPhoto = {
              id: photo.id,
              image: photo.images[3].source,
              link: photo.link,
              height: photo.height,
              width: photo.width
            })
        }
        return facebookPhotos;
      })
  }

  getFacebookEventsFromPage(pageName: string): Observable<CalendarEvent[]> {

    this.facebookEventsUrl = `https://graph.facebook.com/v2.11/${pageName}/events?access_token=${this.accessToken}`;

    let calendarEvents: CalendarEvent[] = [];
    let calendarEvent: CalendarEvent;

    let eventColour = (pageName === 'Bachadiff' ? 'bachadiff_text' : '')

    return this.http.get(this.facebookEventsUrl)
      .map(res => {
        let facebookEventData = res['data'];
        for (let dataItem of facebookEventData) {

          let startTime = dataItem['start_time'];
          let endTime = dataItem['end_time'];
          let title = dataItem['name'];
          let meta = dataItem['description'];

          let smallFirstWordOfTitle = title.split(' ')[0].toLowerCase();

          let eventTimes = dataItem['event_times'];

          if (typeof eventTimes !== 'undefined') {

            for (let reocurringEvent of eventTimes) {

              startTime = reocurringEvent['start_time'];
              endTime = reocurringEvent['end_time'];

              calendarEvent = {
                start: parse(startTime),
                end: parse(endTime),
                title: title,
                color: this.colors.red,
                meta: meta,
                cssClass: `${dataItem['id']} ${eventColour}`
              }
              calendarEvents.push(calendarEvent);


            }
          } else {

            calendarEvent = {
              start: parse(startTime),
              end: parse(endTime),
              title: title,
              color: this.colors.red,
              meta: meta,
              cssClass: `${dataItem['id']} ${eventColour}`
            }
            calendarEvents.push(calendarEvent);

          }



        }
        return calendarEvents;
      })

  }

}
