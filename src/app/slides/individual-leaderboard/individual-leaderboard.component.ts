import { Component, OnInit, Input } from '@angular/core';
import { IndivdualLeaderBoardSlide } from 'src/app/models/individual-leaderboard/individual-leaderboard-slide';

@Component({
  selector: 'slide-individual-leaderboard',
  templateUrl: './individual-leaderboard.component.html',
  styleUrls: ['./individual-leaderboard.component.css']
})
export class IndividualLeaderboardComponent implements OnInit {
  @Input() model: IndivdualLeaderBoardSlide;
  constructor() { }

  ngOnInit() {
  }

}
