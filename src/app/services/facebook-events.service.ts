import { Injectable, ViewChild, TemplateRef, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Http } from '@angular/http';

import {
  CalendarEvent, CalendarEventAction,
} from 'angular-calendar';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
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
  private PAGE_ID = 'Bachadiff';
  private ACCESS_TOKEN = `access_token=EAAZARnD23eboBAAZBcd6FZCNqxIN3tIqf5oFZBansdwYDAteRzIxWgRxeFFSwyrcEEZCin1NCMYwqaxr9ZBxA7hzabH4i8uAEBXNA1ZBtFTGZAXydg8SBzSFzYDz9s6Ec1ChQfIaYZB1T0hja2t2GyAqFOaLTsk2lOUQfig3w8MIwxAZDZD`;
  private LINK = 'https://graph.facebook.com/v3.0/Bachadiff/';
  private EVENTS_QUERY = 'events'
  private VIDEO_QUERY = 'videos?limit=3&fields=source';
  private PHOTOS_QUERY = 'albums?limit=1&fields=photos{height,width,id,images,album,link}';
  private PHOTOS20_QUERY = 'photos?limit=20&fields=images,id,link,height,width';
  private ALBUM_QUERY = 'photos?fields=images,id,link,height,width';
  private ALBUM_NAMES_QUERY = 'albums?limit=3&fields=description,name';
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

    this.facebookEventsUrl = `${this.LINK}${this.EVENTS_QUERY}?${this.ACCESS_TOKEN}`;

    this.facebookVideosUrl = `${this.LINK}${this.VIDEO_QUERY}&${this.ACCESS_TOKEN}`;

    this.facebookPhotosUrl = `${this.LINK}${this.PHOTOS_QUERY}&${this.ACCESS_TOKEN}`;

    this.facebookAlbumPhotosUrl = `${this.LINK}${this.ALBUM_QUERY}&${this.ACCESS_TOKEN}`;

    this.facebookAlbumNamesUrl = `${this.LINK}${this.ALBUM_NAMES_QUERY}&${this.ACCESS_TOKEN}`;
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

  getFacebookEventsFromPage(pageName: string): Observable<CalendarEvent[]> {

    this.facebookEventsUrl = `${this.LINK}${this.EVENTS_QUERY}?${this.ACCESS_TOKEN}`;

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
