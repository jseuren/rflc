import { Component, OnInit } from '@angular/core';
import { AppConfig } from '../app-config/app.config';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  AppConfigLocal = AppConfig;
  constructor() { }

  ngOnInit() {
    
  }

}
