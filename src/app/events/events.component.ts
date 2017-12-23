import {
  Component, OnInit, ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  NgZone,
  ElementRef,
  Renderer2
} from '@angular/core';

import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs/Subject';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';
import { FacebookEventsService } from '../services/facebook-events.service';
import { Meta, Title } from '@angular/platform-browser';
import { mergeMap } from 'rxjs/operator/mergeMap';
import { forkJoin } from 'rxjs/observable/forkJoin';

declare var $: any


const colors: any = {
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


@Component({
  selector: 'app-events',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],


})
export class EventsComponent implements OnInit {

  events: CalendarEvent[];

  constructor(private facebookEventService: FacebookEventsService, private zone: NgZone, meta: Meta, title: Title) {
    title.setTitle('Bachadiff Bachata Dance Classes in Cardiff Events Page');


    let description = 'Checkout the Bachadiff calendar for our latest Bachata classes, parties in Cardiff and all over the U.K!';
    meta.addTags([

      { property: "og:url", content: "http://bachadiff.co.uk/events/" },
      { property: "og:type", content: "Website" },
      { property: "og:title", content: "Bachadiff Bachata Dance Classes in Cardiff Events Page" },
      { property: "og:description", content: description },
      { property: "og:image", content: "https://s3.eu-west-2.amazonaws.com/bachadiff-assets/genericPoster.jpg" },
      { name: "fb:app_id", content: "1778581352446394" },

      { name: 'author', content: 'Fenando Ania' },
      { name: 'keywords', content: 'Bachata, bachadiff, cardiff, wales, salsa, latin, dance, classes' },
      { name: 'description', content: description },
      { name: "fragment", content: "!" }

    ]);
  }



  modalHeader: string;
  modalBody: string;

  view: string = 'month';
  eventId: string;

  viewDate: Date = new Date();

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();



  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {

    this.eventId = events[0].cssClass.split(' ')[0]
    this.modalHeader = events[0].title;
    this.modalBody = '';

    let splitBody = events[0].meta.trim().replace(/ /g, '&nbsp;').split('\n');

    for (let paragraph of splitBody) {
      this.modalBody = this.modalBody.concat(paragraph + '<br/>');
    }

    $('.modal').modal();
    $('#modal1').modal('open');
  }

  eventTimesChanged({
      event,
    newStart,
    newEnd
    }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.eventId = event.cssClass.split(' ')[0]
    this.modalHeader = event.title;
    this.modalBody = event.meta;


    $('.modal').modal();
    $('#modal1').modal('open');

  }

  addEvent(): void {
    this.events.push({
      title: 'New event',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: colors.red,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    });
    this.refresh.next();
  }

  getEvents() {

    const bachadiffEvents = this.facebookEventService.getFacebookEventsFromPage('Bachadiff');
    const bosEvents = this.facebookEventService.getFacebookEventsFromPage('BachataOnSaturday');
    const salsaSouls = this.facebookEventService.getFacebookEventsFromPage('SalsaSoulsBristol')

    forkJoin([bachadiffEvents, bosEvents, salsaSouls]).subscribe(events => {
      this.events = [];

      for (let eventGroup of events) {
        this.events = this.events.concat(eventGroup);
      }

      this.refresh.next();
    })


  }


  ngOnInit() {
    this.getEvents();


  }

}
