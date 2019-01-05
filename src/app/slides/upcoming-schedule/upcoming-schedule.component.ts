import { Component, OnInit, Input } from '@angular/core';
import { UpcomingSchduleSlide } from 'src/app/models/upcoming-schedule/upcomig-schedule-slide';

@Component({
  selector: 'slide-upcoming-schedule',
  templateUrl: './upcoming-schedule.component.html',
  styleUrls: ['./upcoming-schedule.component.css']
})
export class UpcomingScheduleComponent implements OnInit {
  @Input() model: UpcomingSchduleSlide;
  constructor() { }

  ngOnInit() {
  }

}
