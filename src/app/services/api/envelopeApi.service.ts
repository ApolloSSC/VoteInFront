// Imports
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { GenericApiService } from './genericApi.service';
import { SharedService } from '../shared.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

import { Envelope, EnvelopeViewModel } from '../../model/model';
import { TranslateService } from '@ngx-translate/core';

// Decorator to tell Angular that this class can be injected as a service to another class
@Injectable()
export class EnvelopeApiService extends GenericApiService<Envelope> {
    
    constructor(httpClient: HttpClient, sharedService: SharedService, authService: AuthService, translate: TranslateService) {
        super(sharedService, httpClient, authService, translate);
        this.controllerName = 'envelope';
    }

    voter(obj: EnvelopeViewModel, notification: boolean = true): Observable<any> {
        const endPoint = '/voter';
        if (notification) {
            this.sharedService.startLoading();
            return this.httpClient
                .post(this.apiUrl + this.controllerName + endPoint, obj)
                .map((res: Response) => this.manageSuccess(res, this.MSG_CREATE_SUCCESS))
                .catch((error: any) => this.manageError(error));
        } else {
            return this.httpClient
                .post(this.apiUrl + this.controllerName + endPoint, obj)
                .map((res: Response) => this.manageSuccess(res, null, false))
                .catch((error: any) => this.manageError(error));
        }
    }
}
