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

export class SAPMetaData {
    public type: string;
    public uri: string;
}