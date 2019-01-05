import { Component, OnInit, Input } from '@angular/core';
import { FundraisingStatsSlide } from 'src/app/models/fundraising-stats/fundraising-stats-slide';

@Component({
  selector: 'slide-fundraising-stats',
  templateUrl: './fundraising-stats.component.html',
  styleUrls: ['./fundraising-stats.component.css']
})
export class FundraisingStatsComponent implements OnInit {

  @Input() model: FundraisingStatsSlide;
  constructor() { }

  ngOnInit() {
  }

}
