import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MasterVolumeControl } from '../models/SAP Hana/sapcommon';
import { TeamLeaderBoard } from '../models/team-leaderboard/team-leaderboard';
import { UpcomingSchdule } from '../models/upcoming-schedule/upcoming-schedule';

const httpOptions = {
    headers: new HttpHeaders({
        'Authorization': ''
    })
};

@Injectable()
export class SAPService {

    constructor(private _http: HttpClient) {
    }

    async getMasterVolumeControl(): Promise<MasterVolumeControl> {
        return await this._http.get<MasterVolumeControl>('https://dlxgrpapitest.apimanagement.ap1.hana.ondemand.com/Z_RM/MASTER_VOLUME?$format=json').toPromise();
    }

    async getTeamLeaderboard(): Promise<Array<TeamLeaderBoard>> {
        //const teamLeaderBoard = await this._http.get<Array<TeamLeaderBoard>>('https://rflapp.azurewebsites.net/leaderboard_laps.php').toPromise();
        //return teamLeaderBoard;

        return await this._http.get<Array<TeamLeaderBoard>>('https://rflapp.azurewebsites.net/leaderboard_laps.php').toPromise();
      }

      async getSchedule(): Promise<Array<UpcomingSchdule>> {
       // const schedule = await this._http.get<Array<UpcomingSchdule>>('https://rflapp.azurewebsites.net/schedule.php').toPromise();
        // schedule;

        return await this._http.get<Array<UpcomingSchdule>>('https://rflapp.azurewebsites.net/schedule.php').toPromise();
      }

}