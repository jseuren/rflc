import { Component, OnInit, Input } from '@angular/core';
import { AnnouncementSlide } from 'src/app/models/announcement/announcement-slide';

@Component({
  selector: 'slide-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent implements OnInit {

  @Input() model: AnnouncementSlide;
  constructor() { }

  ngOnInit() {
  }

}
