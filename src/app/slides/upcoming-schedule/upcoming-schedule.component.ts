import { Component, OnChanges, Input, SimpleChanges, SimpleChange } from '@angular/core';
import { UpcomingSchduleSlide } from 'src/app/models/upcoming-schedule/upcomig-schedule-slide';
import { HttpClient } from '@angular/common/http';
import { UpcomingSchdule } from 'src/app/models/upcoming-schedule/upcoming-schedule';
import * as moment from 'moment/moment';

@Component({
  selector: 'slide-upcoming-schedule',
  templateUrl: './upcoming-schedule.component.html',
  styleUrls: ['./upcoming-schedule.component.css']
})
export class UpcomingScheduleComponent implements OnChanges {
 
  @Input() model: UpcomingSchduleSlide;
  @Input() isActiveSlide: boolean;
  schedule: Array<UpcomingSchdule>;
  constructor(private _http: HttpClient) { }

  ngOnChanges(changes: SimpleChanges): void {
    const activeSlide: SimpleChange = changes.isActiveSlide;
    
    if(activeSlide) {
      if (activeSlide.currentValue === true) {

        this.getSchedule().then(result => {
          result.forEach(function(item){
            item.timeDescription = this.getTimeParamter(item);
            item.start_time = this.getStartTimeParamter(item);
          }, this);
          this.schedule = result;
        });

      } else {
        this.schedule = [];
      }
    }
  }

  getStartTimeParamter(scheduledItem) {
   return moment(scheduledItem.start_datetime, 'YYYY-MM-DD HH:mm:ss').format('HH:mm a');

  }

  getTimeParamter(scheduledItem) {
    let eventTime = moment(scheduledItem.start_datetime, 'YYYY-MM-DD HH:mm:ss').unix();
    let currentTime = moment().unix();
    let diffTime = eventTime - currentTime;
    let duration = moment.duration(diffTime, 'minutes');
    if(diffTime > 0) {
      return duration.asMinutes() + ' minutes time';
    } else {
      return duration.asMinutes() + ' minutes ago';
    }
  }

  async getSchedule(): Promise<Array<UpcomingSchdule>> {
    const schedule = await this._http.get<Array<UpcomingSchdule>>('https://rflapp.azurewebsites.net/schedule.php').toPromise();
    return schedule;
  }

}
