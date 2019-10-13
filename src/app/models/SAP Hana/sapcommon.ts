export class MasterVolumeControl {
    public d: SAPVolumeResult;

}
export class SAPVolumeResult {
    results: Array<SAPVolumeArrayResult>;
}
export class SAPVolumeArrayResult {
    public __metadata: SAPMetaData;
    public key: boolean;
    public value: boolean;
}

export class Fundraising{
    public d: SAPFundraisingResult;
    constructor(){
        this.d = new SAPFundraisingResult();
    }
}
export class SAPFundraisingResult {
    results: Array<SAPFundraisingArrayResult>;
    constructor(){
        this.results = new Array<SAPFundraisingArrayResult>();
    }
}
export class SAPFundraisingArrayResult {
    public __metadata: SAPMetaData;
    public team_name: string;
    public amount: number;
}



export class TeamLeaderboard{
    public d: SAPTeamLeaderboardResult;
    constructor(){
        this.d = new SAPTeamLeaderboardResult();
    }
}
export class SAPTeamLeaderboardResult {
    results: Array<SAPTeamLeaderboardArrayResult>;
    constructor(){
        this.results = new Array<SAPTeamLeaderboardArrayResult>();
    }
}
export class SAPTeamLeaderboardArrayResult {
    public __metadata: SAPMetaData;
    public team_name: string;
    public LAPS: number;
}

export class Schedule{
    public d: SAPScheduleResult;
    constructor(){
        this.d = new SAPScheduleResult();
    }
}
export class SAPScheduleResult {
    results: Array<SAPScheduleArrayResult>;
    constructor(){
        this.results = new Array<SAPScheduleArrayResult>();
    }
}
export class SAPScheduleArrayResult {
    public __metadata: SAPMetaData;
    public schedule_name: string;
    public start_datetime: Date;
    public end_datetime: Date;
    public description: string;
    public location: string;

    public timeDescription: string
}


export class SAPMetaData {
    public type: string;
    public uri: string;
}