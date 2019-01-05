import { Component, OnInit, Input } from '@angular/core';
import { WeatherSlide } from 'src/app/models/weather/weather-slide';

@Component({
  selector: 'slide-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  @Input() model: WeatherSlide;
  
  constructor() { }

  ngOnInit() {
  }

}
