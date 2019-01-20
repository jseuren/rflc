import { Component, OnInit } from '@angular/core';
import { AppConfig } from '../app-config/app.config';
import { SpotifyService } from '../services/spotify.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [SpotifyService]
})
export class AdminComponent implements OnInit {

  AppConfigLocal = AppConfig;
  constructor() { }

  ngOnInit() {
    
  }

}
