import { Component, OnInit, Input } from '@angular/core';
import { CountdownClockSlide } from 'src/app/models/countdown-clock/countdown-clock-slide';
import * as moment from 'moment/moment';
import { timer } from 'rxjs';
const source = timer(1000, 1000);
@Component({
  selector: 'slide-countdown-clock',
  templateUrl: './countdown-clock.component.html',
  styleUrls: ['./countdown-clock.component.css']
})
export class CountdownClockComponent implements OnInit {

  @Input() model: CountdownClockSlide;

  public TimeTillEnd: string;

  constructor() { 
   
  }

  ngOnInit() {
    source.subscribe(() => {
      this.calculateTimeTillEnd();
    });
   
  }

  private calculateTimeTillEnd(): void {
    //if it is still valid to show the date time (as the end time has not already passed)
    if (moment() <= moment(this.model.EndTime)) {
      let a = moment(this.model.EndTime);
      let b = moment();
      //event not yet started
      let duration = moment.duration(b.diff(a));
      let DaysTillStart = duration.days()
      let HoursTillStart = duration.hours();
      let MinutesTillStart = duration.minutes();
      let SecondsTillStart = duration.seconds();
      this.TimeTillEnd = Math.abs(DaysTillStart) + ' Days ' + Math.abs(HoursTillStart) + ' Hours ' + Math.abs(MinutesTillStart) + ' Minutes ' + Math.abs(SecondsTillStart) + ' seconds.';
    }
  }

}
