import { Component, OnInit, Input } from '@angular/core';
import { Slide } from 'src/app/models/slide';

@Component({
  selector: 'slide-team-leaderboard',
  templateUrl: './team-leaderboard.component.html',
  styleUrls: ['./team-leaderboard.component.css']
})
export class TeamLeaderboardComponent implements OnInit {
  @Input() model: Slide;
  constructor() { }

  ngOnInit() {
  }

}
