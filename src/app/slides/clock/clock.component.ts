import { Component, OnInit, Input } from '@angular/core';
import { Slide } from 'src/app/models/slide';

@Component({
  selector: 'slide-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit {
  @Input() model: Slide;
  constructor() { }

  ngOnInit() {
  }

}
