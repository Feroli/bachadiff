import { Injectable, ViewChild, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Http } from '@angular/http';

import {
  CalendarEvent, CalendarEventAction,
} from 'angular-calendar';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';


@Injectable()
export class FacebookEventsService {

  private facebookEventsUrl: string;
  private pageId = 'Bachadiff'
  private accessToken = 'EAACEdEose0cBAIH64OH05ZACnlETOl0JXscbz10Q49ZALWJMvauTfVd0AlTLBH32PeZAyGYmEKE54xOZBZCd5tyFBSFO9zAf9TKl58iemSfk9qeJ6rb78ff6P5zt5X7ZArbL1kSGMqjRfIwMFmomOZAVbgrh0ZCCibsl3mSJfLDRt9MvUpNKGp8avkpXemOKylZBc06reWklkZCAZDZD';

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

  private  modalData: {
    action: string;
    event: CalendarEvent;
  };


  constructor(private http: HttpClient) {
    this.facebookEventsUrl = `
      https://graph.facebook.com/v2.11/${this.pageId}/events?access_token=${this.accessToken}
      `;
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