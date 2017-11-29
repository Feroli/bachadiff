import { Injectable, ViewChild, TemplateRef } from '@angular/core';
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


@Injectable()
export class FacebookEventsService {

  private facebookEventsUrl: string;
  private facebookVideosUrl: string;
  private facebookPhotosUrl: string;
  private facebookAlbumNamesUrl: string;
  private facebookAlbumPhotosUrl: string;
  private albumId: number;
  private pageId = 'Bachadiff'
  private accessToken = `EAAZARnD23eboBAIiiXBt0ACukutbu4T6gUXytLbfmrYd8Y2oMhdbuVMlhqLcVh4HcjZByVtaxKAXh25Oev36XVq7foFjaPkzQ2kDr5gZAAuKbZCQB4ZAkey8nTi895Tj7GTYFVT2cZBUnSpYbAgwIaTmoFgh0qGKyScYpbKdWOzgZDZD`;

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


  constructor(private http: HttpClient) {
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

          //       if (header.name = 'profile pictures' || header.name = 'cover photos') {
          //   continue;
          // } else {

          if (header['name'] === 'Profile Pictures' || header['name'] === 'Cover Photos' || header['name'] === "Mobile Uploads") {
            continue;
          } else {

            albumHeaderNames.push(
              albumHeader = {
                'name': header['name'],
                'description': header['description'],
                'id': header['id']
              }
            );
          }

        }

        return albumHeaderNames;

      })
  };
  getBachadiffAlbumPhotos(albumId: number) {

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

  getBachaDiffFacebookEvents(): Observable<CalendarEvent[]> {

    let calendarEvents: CalendarEvent[] = [];
    let calendarEvent: CalendarEvent;
    return this.http.get(this.facebookEventsUrl)
      .map(res => {
        let facebookEventData = res['data'];

        for (let dataItem of facebookEventData) {
          calendarEvent = {
            start: new Date(dataItem['start_time']),
            end: new Date(dataItem['end_time']),
            title: dataItem['name'],
            color: this.colors.red,
            cssClass: `${dataItem['id']}`
          }
          calendarEvents.push(calendarEvent);

        }
        return calendarEvents;
      })

  }

}
