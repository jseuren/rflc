import { Component, OnInit, Input } from '@angular/core';
import { InstagramSlide } from 'src/app/models/instagram/instagram-slide';

@Component({
  selector: 'silde-instagram',
  templateUrl: './instagram.component.html',
  styleUrls: ['./instagram.component.css']
})
export class InstagramComponent implements OnInit {

  @Input() model: InstagramSlide;
  constructor() { }

  ngOnInit() {
  }

}
