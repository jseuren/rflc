import { Component, OnInit, Input } from '@angular/core';
import { SponsorsSlide } from 'src/app/models/sponsors/sponsors-slide';

@Component({
  selector: 'slide-sponsors',
  templateUrl: './sponsors.component.html',
  styleUrls: ['./sponsors.component.css']
})
export class SponsorsComponent implements OnInit {

  @Input() model: SponsorsSlide;
  constructor() { }

  ngOnInit() {
  }

}
