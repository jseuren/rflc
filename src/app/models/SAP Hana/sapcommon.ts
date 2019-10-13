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



export class SAPMetaData {
    public type: string;
    public uri: string;
}