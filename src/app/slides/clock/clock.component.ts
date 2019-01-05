import { Component, OnInit, Input } from '@angular/core';
import { ClockSlide } from 'src/app/models/clock/clock-slide';

@Component({
  selector: 'slide-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit {
  @Input() model: ClockSlide;
  constructor() { }

  ngOnInit() {
  }

}
