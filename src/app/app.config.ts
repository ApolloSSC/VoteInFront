import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { IAppConfig } from './model/model';
@Injectable()
export class AppConfig {
    static settings: IAppConfig;
    constructor(private http: HttpClient) {}
    load() {
        return new Promise<void>((resolve, reject) => {
            AppConfig.settings = {
                authorizedLanguages: environment.authorizedLanguages,
                defaultLang: environment.defaultLang,
                rootPath: environment.rootPath,
                serverPath: environment.serverPath
            }
            resolve();
        });
    }
}