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

  public Days : number;
  public Hours : number;
  public Minutes : number;
  public Seconds : number;
  constructor() { 
   
  }

  ngOnInit() {
    //set inital time to display
    this.calculateTimeTillEnd();
    //recalcualte every second
    source.subscribe(() => {
      this.calculateTimeTillEnd();
    });
   
  }

  private calculateTimeTillEnd(): void {
    //if it is still valid to show the date time (as the end time has not already passed)
    let now = moment();
    let countodownEnd = moment(this.model.CountdownEndTime,'YYYY-MM-DD HH:mm:ss');
    if (now <= countodownEnd) {
      let a = moment(this.model.CountdownEndTime,'YYYY-MM-DD HH:mm:ss');
      let b = moment();
      //event not yet started
      let duration = moment.duration(a.diff(b));
      this.Days = Math.abs(duration.days());
      this.Hours = Math.abs(duration.hours());
      this.Minutes = Math.abs(duration.minutes());
      this.Seconds = Math.abs(duration.seconds());
    }
  }

}
