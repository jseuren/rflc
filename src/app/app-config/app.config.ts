import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { IAppConfig } from './app-config.model';

@Injectable()
export class AppConfig  {
    static settings: IAppConfig;
    constructor(private http: Http) {}
    initialize() {
        return new Promise<void>((resolve, reject) => {
                 AppConfig.settings = {} as IAppConfig;
                 resolve();
             });
    }
}