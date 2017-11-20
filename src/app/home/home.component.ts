import { Component, OnInit } from '@angular/core';
import { Meta, Title } from "@angular/platform-browser";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  question: string;
  answer: string;

  constructor(private router: Router, meta: Meta, title: Title) {
    title.setTitle('Bachadiff Home page');

    meta.addTags([
      { name: 'author', content: 'Fenando Ania' },
      { name: 'keywords', content: 'Bachata, bachadiff, cardiff, wales, salsa, latin, dance' },
      { name: 'description', content: 'This is the bachadiff welcome page for bachata lovers!' }
    ]);
  }



  goToAbout() {
    this.router.navigateByUrl('/about');
  };

  ngOnInit() {
    this.question = "What is Bachata?"
    this.answer = "A social dance not a choreography"
  }

}
