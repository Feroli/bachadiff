import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

   bachaDiffFacebookUrl = "https://www.facebook.com/BachaDiff/";

   constructor(private meta: Meta, title: Title) {
    title.setTitle('Bachadiff Contact Us page');

    meta.addTags([
      { name: 'author', content: 'Fenando Ania' },
      { name: 'keywords', content: 'Bachata, bachadiff, cardiff, wales, salsa, latin, dance, classes' },
      { name: 'description', content: 'This is the bachadiff contact us page, any questions at all send us an email or messege us on facebook!' }
    ]);
  }

  goToBachaDiff() {
    window.open(this.bachaDiffFacebookUrl, '_blank')

  }

  ngOnInit() {
  }

}
