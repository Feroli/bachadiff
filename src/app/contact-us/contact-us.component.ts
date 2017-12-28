import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  bachaDiffFacebookUrl = "https://www.facebook.com/BachaDiff/";

  constructor(private meta: Meta, title: Title) {
    title.setTitle('Bachadiff Bachata Dance Classes in Cardiff Contact Us page');

    let description = 'This is the bachadiff contact us page, any questions at all send us an email or message us on facebook!';

    meta.addTags([
      { property: "og:url", content: "http://bachadiff.co.uk/contactUs/" },
      { property: "og:type", content: "Bachadiff bachata contact us page" },
      { property: "og:title", content: "Bachadiff Bachata Dance Classes in Cardiff contact us Page" },
      { property: "og:description", content: description },
      { property: "og:image", content: "https://s3.eu-west-2.amazonaws.com/bachadiff-assets/genericPoster.jpg" },
      { name: "fb:app_id", content: "1778581352446394"},

      { name: 'author', content: 'Fenando Ania' },
      { name: 'keywords', content: 'Bachata, bachadiff, cardiff, wales, salsa, latin, dance, classes' },
      { name: 'description', content: description },


    ]);
  }

  goToBachaDiff() {
    window.open(this.bachaDiffFacebookUrl, '_blank')

  }

  ngOnInit() {
  }

}
