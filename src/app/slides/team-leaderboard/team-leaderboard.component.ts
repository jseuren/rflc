import { Component, OnChanges, Input, SimpleChanges, SimpleChange } from '@angular/core';
import { TeamLeaderBoardSlide } from 'src/app/models/team-leaderboard/team-leaderboard-slide';
import { HttpClient } from '@angular/common/http';
import { TeamLeaderBoard } from 'src/app/models/team-leaderboard/team-leaderboard';

@Component({
  selector: 'slide-team-leaderboard',
  templateUrl: './team-leaderboard.component.html',
  styleUrls: ['./team-leaderboard.component.css']
})
export class TeamLeaderboardComponent implements OnChanges {
  @Input() model: TeamLeaderBoardSlide;
  @Input() isActiveSlide: boolean;
  teamLeaderboarData: Array<TeamLeaderBoard>;
  constructor(private _http: HttpClient) { }

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
    const teamLeaderBoard = await this._http.get<Array<TeamLeaderBoard>>('https://rflapp.azurewebsites.net/leaderboard_laps.php').toPromise();
    return teamLeaderBoard;
  }

}
