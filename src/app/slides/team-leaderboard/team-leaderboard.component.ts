import { Component, OnInit, Input } from '@angular/core';
import { TeamLeaderBoardSlide } from 'src/app/models/team-leaderboard/team-leaderboard-slide';

@Component({
  selector: 'slide-team-leaderboard',
  templateUrl: './team-leaderboard.component.html',
  styleUrls: ['./team-leaderboard.component.css']
})
export class TeamLeaderboardComponent implements OnInit {
  @Input() model: TeamLeaderBoardSlide;
  constructor() { }

  ngOnInit() {
  }

}
