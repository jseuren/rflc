import { Component, OnChanges, Input, SimpleChanges, SimpleChange } from '@angular/core';
import { TeamLeaderBoardSlide } from 'src/app/models/team-leaderboard/team-leaderboard-slide';
import { SAPService } from 'src/app/services/sapService';
import { TeamLeaderboard } from 'src/app/models/SAP Hana/sapcommon';

@Component({
  selector: 'slide-team-leaderboard',
  templateUrl: './team-leaderboard.component.html',
  styleUrls: ['./team-leaderboard.component.css'],
  providers: [SAPService]
})
export class TeamLeaderboardComponent implements OnChanges {
  @Input() model: TeamLeaderBoardSlide;
  @Input() isActiveSlide: boolean;
  teamLeaderboarData: TeamLeaderboard;
  constructor(private sapService: SAPService) { }

  ngOnChanges(changes: SimpleChanges) {
    const activeSlide: SimpleChange = changes.isActiveSlide;
    
    if(activeSlide) {
      if (activeSlide.currentValue === true) {

        this.getTeamLeaderboard().then(result => {
          this.teamLeaderboarData = result;
        });

      } else {
        this.teamLeaderboarData = new TeamLeaderboard();
      }
    }
    
  }

  async getTeamLeaderboard(): Promise<TeamLeaderboard> {
    return this.sapService.getTeamLeaderboard();
  }

}
