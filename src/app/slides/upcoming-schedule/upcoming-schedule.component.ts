import { Component, OnInit, Input } from '@angular/core';
import { Slide } from 'src/app/models/slide';

@Component({
  selector: 'slide-upcoming-schedule',
  templateUrl: './upcoming-schedule.component.html',
  styleUrls: ['./upcoming-schedule.component.css']
})
export class UpcomingScheduleComponent implements OnInit {
  @Input() model: Slide;
  constructor() { }

  ngOnInit() {
  }

}
