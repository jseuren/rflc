import { Component, OnInit, Input } from '@angular/core';
import { Slide } from 'src/app/models/slide';

@Component({
  selector: 'slide-individual-leaderboard',
  templateUrl: './individual-leaderboard.component.html',
  styleUrls: ['./individual-leaderboard.component.css']
})
export class IndividualLeaderboardComponent implements OnInit {
  @Input() model: Slide;
  constructor() { }

  ngOnInit() {
  }

}
