import { Injectable } from '@angular/core';
import { IAppConfig } from './app-config.model';

@Injectable()
export class AppConfig {
    static settings: IAppConfig;

    constructor() { }
    initialize() {
        return new Promise<void>((resolve, reject) => {
            var savedSettings = JSON.parse(localStorage.getItem('appconfig'));
            AppConfig.settings = savedSettings || {} as IAppConfig;
            resolve();
        });
    }

    //save to local storage so as not to have to re-enter detail every time
    static save() {
        localStorage.setItem('appconfig', JSON.stringify(AppConfig.settings));
    }
}