import { Component, OnChanges, Input, SimpleChanges, SimpleChange } from '@angular/core';
import { UpcomingSchduleSlide } from 'src/app/models/upcoming-schedule/upcomig-schedule-slide';
import * as moment from 'moment/moment';
import { SAPService } from 'src/app/services/sapService';
import { Schedule, SAPScheduleArrayResult } from 'src/app/models/SAP Hana/sapcommon';

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

    if (activeSlide) {
      if (activeSlide.currentValue === true) {

        this.getSchedule().then(result => {
          result.d.results.forEach(function (item) {
            item.timeDescription = this.getTimeParamter(item);
            item.start_time_formatted = this.getStartStartEndTimeParamter(item.start_date + ' ' + item.start_time);
            item.end_time_formatted = this.getStartStartEndTimeParamter(item.end_date + ' ' + item.end_time);
          }, this);
          this.schedule = result;

          this.schedule.d.results = this.schedule.d.results.sort((a, b) => <any>new Date(a.start_date + ' ' + a.start_time) - <any>new Date(b.start_date + ' ' + b.start_time));
          this.schedule.d.results = this.schedule.d.results.filter(a => <any>new Date(a.start_date + ' ' + a.start_time) > new Date());

        });

      } else {
        this.schedule = new Schedule();
      }
    }
  }

  getStartStartEndTimeParamter(date_time: string) {
    let dateTime = moment(date_time, 'YYYY-MM-DD HH:mm:ss');
    console.log(date_time);
    console.log(dateTime);
    return dateTime.format('HH:mm a');
  }

  getTimeParamter(scheduledItem: SAPScheduleArrayResult) {

    var duration = moment.duration(moment(scheduledItem.start_date + ' ' + scheduledItem.start_time, 'YYYY-MM-DD HH:mm').diff(moment()));
    return 'In ' + Math.round(duration.asMinutes()) + ' minutes time';
  }

  async getSchedule(): Promise<Schedule> {
    return this.sapService.getSchedule();
  }

}
