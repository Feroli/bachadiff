import { Component, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { FacebookEventsService } from '../services/facebook-events.service';
import { FacebookPhoto } from '../interfaces/facebook-photo';
import { Observable } from 'rxjs/Observable';
declare var $;
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit, AfterViewInit, AfterViewChecked {


  bachataVidsArray: Array<object>
  bachataPicsArray: FacebookPhoto[];
  carrousellIterator: Array<string>;
  hoveredId: number;
  depth5 = 'z-depth-5';
  depth1 = 'z-depth-1';
  constructor(private facebookService: FacebookEventsService) {}

  mouseEnter(event: MouseEvent, id: number) {
    this.hoveredId = id;
    this.depth5 = event.type == 'mouseenter' ? 'z-depth-5' : 'z-depth-1';
  }

  mouseLeave(event: MouseEvent) {
    this.depth1 = 'z-depth-1';
    this.depth5 = 'z-depth-1';
  }

  ngAfterViewChecked() {

    $('.materialboxed').materialbox();


  }
  ngAfterViewInit(): void {
    $('.carousel.carousel-slider').carousel({ fullWidth: true });


  }
  ngOnInit() {

    this.facebookService.getBachadiffFacebookVideos().subscribe(res => { this.bachataVidsArray = res;});
    this.facebookService.getBachadiffFacebookLastClassPictures().subscribe(res => this.bachataPicsArray = res);

    this.carrousellIterator = ['#one!', '#two!', '#three!', '#four!', '#five!'];

    // this.bachataVidsArray = [
    //   {'source': '/Users/feroli/sites/AmaliasRagdolls/src/assets/beatbox.mp4' },
    //   {'source': 'https://www.youtube.com/watch?v=6IkfZvsgmwQ&ab_channel=GamersHeroes'}
    // ]
  }

}