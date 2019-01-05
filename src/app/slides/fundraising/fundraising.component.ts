import { Component, OnInit, Input } from '@angular/core';
import { FundraisingSlide } from 'src/app/models/fundraising/fundraising-slide';

@Component({
  selector: 'slide-fundraising',
  templateUrl: './fundraising.component.html',
  styleUrls: ['./fundraising.component.css']
})
export class FundraisingComponent implements OnInit {

  @Input() model: FundraisingSlide;
  constructor() { }

  ngOnInit() {
  }

}
