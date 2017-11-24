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
  private pageId = 'Bachadiff'
  private accessToken = `EAAZARnD23eboBAPRKVellPokt6tkCXTyDN12JVv3PtCNC5kuZCwWFNQQl2XezlnHE1U1BoxMOpICbFqAi39ci8FPpLF7Cx9hWvA9ZBztmHFutZA6XqOckeBj0Q9kn422SwE9YeeZAY9u2GKZCV4Lf1llyZCPsFx7YTKY8x9wkATgQZDZD`;

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
      https://graph.facebook.com/v2.11/${this.pageId}/videos?videos?fields=source&access_token=${this.accessToken}
      `;

    this.facebookPhotosUrl = `
      https://graph.facebook.com/v2.11/${this.pageId}/albums?limit=1&fields=photos{height,width,id,picture,name,link}&access_token=${this.accessToken}
      `;
  }

  getBachadiffFacebookVideos(): Observable<FacebookVideo[]> {
    return this.http.get(this.facebookVideosUrl)
      .map(res => {
        let facebookVideos: FacebookVideo[] = [];
        let facebookVideo: FacebookVideo;

        let facebookPhotoData = res['data'][0]['source'];
        for (let video of facebookVideos) {
          facebookVideos.push(
            facebookVideo = {
              source: video.source
            })
        }

        return facebookVideos;
      })
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
              picture: photo.picture,
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
