import { Component, OnInit, Input } from '@angular/core';
import { Slide } from 'src/app/models/slide';

@Component({
  selector: 'slide-countdown-clock',
  templateUrl: './countdown-clock.component.html',
  styleUrls: ['./countdown-clock.component.css']
})
export class CountdownClockComponent implements OnInit {

  @Input() model: Slide;
  constructor() { }

  ngOnInit() {
  }

}
