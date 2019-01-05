import { Component, OnInit, Input } from '@angular/core';
import { CountdownClockSlide } from 'src/app/models/countdown-clock/countdown-clock-slide';

@Component({
  selector: 'slide-countdown-clock',
  templateUrl: './countdown-clock.component.html',
  styleUrls: ['./countdown-clock.component.css']
})
export class CountdownClockComponent implements OnInit {

  @Input() model: CountdownClockSlide;
  constructor() { }

  ngOnInit() {
  }

}
