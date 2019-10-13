import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MasterVolumeControl } from '../models/SAP Hana/sapcommon';
import { TeamLeaderBoard } from '../models/team-leaderboard/team-leaderboard';
import { UpcomingSchdule } from '../models/upcoming-schedule/upcoming-schedule';
import { Fundraising } from '../models/fundraising/fundraising';

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

        return await this._http.get<Array<TeamLeaderBoard>>('https://dlxgrpapitest.apimanagement.ap1.hana.ondemand.com/Z_RM/LEADERBOARD_LAPS?$format=json').toPromise();
    }

    async getSchedule(): Promise<Array<UpcomingSchdule>> {
        // const schedule = await this._http.get<Array<UpcomingSchdule>>('https://rflapp.azurewebsites.net/schedule.php').toPromise();
        // schedule;

        return await this._http.get<Array<UpcomingSchdule>>('https://dlxgrpapitest.apimanagement.ap1.hana.ondemand.com/Z_RM/SCHEDULE?$format=json').toPromise();
    }

    async getTeamFundraising(): Promise<Array<Fundraising>> {
        // const teamFundraising = await this._http.get<Array<Fundraising>>('https://rflapp.azurewebsites.net/fundraising.php').toPromise();
        // return teamFundraising;
        return await this._http.get<Array<Fundraising>>('https://dlxgrpapitest.apimanagement.ap1.hana.ondemand.com/Z_RM/LEADERBOARD_FUNDRAISING?$format=json').toPromise();

    }

}