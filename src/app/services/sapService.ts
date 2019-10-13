import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MasterVolumeControl, Fundraising, TeamLeaderboard, Schedule } from '../models/SAP Hana/sapcommon';

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

    async getTeamLeaderboard(): Promise<TeamLeaderboard> {
        //const teamLeaderBoard = await this._http.get<Array<TeamLeaderBoard>>('https://rflapp.azurewebsites.net/leaderboard_laps.php').toPromise();
        //return teamLeaderBoard;

        return await this._http.get<TeamLeaderboard>('https://dlxgrpapitest.apimanagement.ap1.hana.ondemand.com/Z_RM/LEADERBOARD_LAPS?$format=json').toPromise();
    }

    async getSchedule(): Promise<Schedule> {
        // const schedule = await this._http.get<Array<UpcomingSchdule>>('https://rflapp.azurewebsites.net/schedule.php').toPromise();
        // schedule;

        return await this._http.get<Schedule>('https://dlxgrpapitest.apimanagement.ap1.hana.ondemand.com/Z_RM/SCHEDULE?$format=json').toPromise();
    }

    async getTeamFundraising(): Promise<Fundraising> {
        // const teamFundraising = await this._http.get<Array<Fundraising>>('https://rflapp.azurewebsites.net/fundraising.php').toPromise();
        // return teamFundraising;
        return await this._http.get<Fundraising>('https://dlxgrpapitest.apimanagement.ap1.hana.ondemand.com/Z_RM/LEADERBOARD_FUNDRAISING?$format=json').toPromise();

    }

}