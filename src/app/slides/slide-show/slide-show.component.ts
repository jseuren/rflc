import { Component, OnInit, Input } from '@angular/core';
import { SlideShowSlide } from 'src/app/models/slide-show/slide-show';

@Component({
  selector: 'slide-slide-show',
  templateUrl: './slide-show.component.html',
  styleUrls: ['./slide-show.component.css']
})
export class SlideShowComponent implements OnInit {

  @Input() model: SlideShowSlide;
  constructor() { }

  ngOnInit() {
  }

}
