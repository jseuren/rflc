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
    //recalcualte every second
    source.subscribe(() => {
      this.calculateTimeTillEnd();
    });
   
  }

  private calculateTimeTillEnd(): void {
    //if it is still valid to show the date time (as the end time has not already passed)
    if (moment() <= moment(this.model.CountdownEndTime)) {
      let a = moment(this.model.CountdownEndTime);
      let b = moment();
      //event not yet started
      let duration = moment.duration(b.diff(a));
      let DaysTillEnd = duration.days()
      let HoursTillEnd = duration.hours();
      let MinutesTillEnd = duration.minutes();
      let SecondsTillEnd = duration.seconds();
      this.TimeTillEnd = Math.abs(DaysTillEnd) + ' Days ' + Math.abs(HoursTillEnd) + ' Hours ' + Math.abs(MinutesTillEnd) + ' Minutes ' + Math.abs(SecondsTillEnd) + ' seconds.';
    }
  }

}
