import { Component, OnChanges, Input, SimpleChanges, SimpleChange } from '@angular/core';
import { TeamLeaderBoardSlide } from 'src/app/models/team-leaderboard/team-leaderboard-slide';
import { TeamLeaderBoard } from 'src/app/models/team-leaderboard/team-leaderboard';
import { SAPService } from 'src/app/services/sapService';

@Component({
  selector: 'slide-team-leaderboard',
  templateUrl: './team-leaderboard.component.html',
  styleUrls: ['./team-leaderboard.component.css'],
  providers: [SAPService]
})
export class TeamLeaderboardComponent implements OnChanges {
  @Input() model: TeamLeaderBoardSlide;
  @Input() isActiveSlide: boolean;
  teamLeaderboarData: Array<TeamLeaderBoard>;
  constructor(private sapService: SAPService) { }

  ngOnChanges(changes: SimpleChanges) {
    const activeSlide: SimpleChange = changes.isActiveSlide;
    
    if(activeSlide) {
      if (activeSlide.currentValue === true) {

        this.getTeamLeaderboard().then(result => {
          this.teamLeaderboarData = result;
        });

      } else {
        this.teamLeaderboarData = [];
      }
    }
    
  }

  async getTeamLeaderboard(): Promise<Array<TeamLeaderBoard>> {
    return this.sapService.getTeamLeaderboard();
  }

}
