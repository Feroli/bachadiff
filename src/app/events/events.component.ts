import {
  Component, OnInit, ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  NgZone
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

  constructor(private facebookEventService: FacebookEventsService, private zone: NgZone) {
    this.getEvents();

  }

  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  modalHeader: string;
  modalBody: string;

  view: string = 'month';
   eventId: string;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

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





  // events: CalendarEvent[] = [
  //   {
  //     start: subDays(startOfDay(new Date()), 1),
  //     end: addDays(new Date(), 1),
  //     title: 'Bachadiff',
  //     color: colors.red,
  //     actions: this.actions
  //   },
  //   {
  //     start: startOfDay(new Date()),
  //     title: 'An event with no end date',
  //     color: colors.yellow,
  //     actions: this.actions
  //   },
  //   {
  //     start: subDays(endOfMonth(new Date()), 3),
  //     end: addDays(endOfMonth(new Date()), 3),
  //     title: 'A long event that spans 2 months',
  //     color: colors.blue
  //   },
  //   {
  //     start: addHours(startOfDay(new Date()), 2),
  //     end: new Date(),
  //     title: 'A draggable and resizable event',
  //     color: colors.yellow,
  //     actions: this.actions,
  //     resizable: {
  //       beforeStart: true,
  //       afterEnd: true
  //     },
  //     draggable: true
  //   }
  // ];

  activeDayIsOpen: boolean = true;


  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {

    this.eventId = events[0].cssClass
    this.modalHeader = events[0].title;


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
    this.modalData = { event, action };
    this.eventId = event.cssClass
    this.modalHeader = event.title;


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
    this.facebookEventService.getBachaDiffFacebookEvents()
      .subscribe(calendarData => {
        this.zone.run(() => {
          this.events = calendarData;

        });
      });


  }

  ngOnInit() {

    this.getEvents();


    this.modalBody = `
      BachaDiff is proud to present you an International bachata teacher/performer & DJ Daniel Chong!!!

      <br/>
      <p>🌟THE BachaDIFF TEAM🌟</p>
      **International bachata teacher/performer & DJ Daniel Chong!
      <br/>
      Check him out with his dance partner by hitting like on their page Daniel & Pebbles
      <br/>
      https://www.facebook.com/Daniel.Pebbles.Palpita
      <br/>
      <br/>

      Daniel is one of the TOP UK Bachata teachers/performers who has been teaching high quality bachata classes internationally and across the UK. Known for his focus on "MusiKILLity" and utilising his strengths in ALL styles of Bachata to interpret the music. He is also the MAN behind the famous BOS - Bachata On Saturday in London!
      <br/>
      https://www.facebook.com/BachataOnSaturday/
      <br/>
      <br/>


     <p> **Fernando Javier Ania Hernandez</p>

     <p> **Jason "DJ JAY"</p>

     </p> 🌟WHEN?🌟</p>
      Thursday in November 2017

      <p>🌟WHERE?🌟</p>
      Upstairs at
      <br/>
      O'Neills
      <br/>
      85-87 St Mary St
      <br/>
      Cardiff CF10 1DW
      <br/>

      <p>🌟TIME?🌟</p>
      7:00pm - Doors open - change shoes, register
      <br/>
      7:30pm – 9:30pm
      <br/>
      9:30pm till late - FREE Dance party (Bachata with a touch of Salsa and Kizomba)
      <br/>

      <p>🌟PRICE?🌟</p>
      2 Classes £9 (£7 NUS)
      <br/>
      1 Class £7 (£5 NUS)
      <br/>

      <p>The BachaDIFF team focus will be for Bachata Social Dancing and we aim to highlight the music, culture and flow of the dance and most importantly to produce high quality dancers through quality teaching and attention to the basics and fundamentals focusing on concepts of movement, in a super FUN learning environment.</p>

      <p>🌟JOIN OUR MAILING LIST🌟</p>
      For updates and details of our classes, Special Offers, Discounts for International Festivals and Congresses

      <p>To join please email the following details to bachadiff@gmail.com</p>
      Name
      <br/>
      Surname
      <br/>
      Email Address
      <br/>
      Mobile Number (For BachaDIFF Whatsapp group)
      <br/>
      <br/>

      See you there for the top bachata night in Cardiff!
      `;

  }

}
