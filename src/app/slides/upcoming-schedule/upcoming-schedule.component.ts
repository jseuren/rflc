import { Component, OnChanges, Input, SimpleChanges, SimpleChange } from '@angular/core';
import { UpcomingSchduleSlide } from 'src/app/models/upcoming-schedule/upcomig-schedule-slide';
import * as moment from 'moment/moment';
import { SAPService } from 'src/app/services/sapService';
import { Schedule } from 'src/app/models/SAP Hana/sapcommon';

@Component({
  selector: 'slide-upcoming-schedule',
  templateUrl: './upcoming-schedule.component.html',
  styleUrls: ['./upcoming-schedule.component.css'],
  providers: [SAPService]
})
export class UpcomingScheduleComponent implements OnChanges {
 
  @Input() model: UpcomingSchduleSlide;
  @Input() isActiveSlide: boolean;
  schedule: Schedule;
  constructor(private sapService: SAPService) { }

  ngOnChanges(changes: SimpleChanges): void {
    const activeSlide: SimpleChange = changes.isActiveSlide;
    
    if(activeSlide) {
      if (activeSlide.currentValue === true) {

        this.getSchedule().then(result => {
          result.d.results.forEach(function(item){
            item.timeDescription = this.getTimeParamter(item);
            item.start_datetime = this.getStartEndTimeParamter(item);
            item.end_datetime = this.getStartEndTimeParamter(item);
          }, this);
          this.schedule = result;
        });

      } else {
        this.schedule = new Schedule();
      }
    }
  }

  getStartEndTimeParamter(scheduledItem) {
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

  async getSchedule(): Promise<Schedule> {
    return this.sapService.getSchedule();
    //const schedule = await this._http.get<Array<UpcomingSchdule>>('https://rflapp.azurewebsites.net/schedule.php').toPromise();
    //return schedule;
  }

}
