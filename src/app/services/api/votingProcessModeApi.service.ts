// Imports
import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { GenericApiService } from './genericApi.service';
import { SharedService } from '../shared.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

import { VotingProcessMode } from '../../model/model';
import { TranslateService } from '@ngx-translate/core';

// Decorator to tell Angular that this class can be injected as a service to another class
@Injectable()
export class VotingProcessModeApiService extends GenericApiService<VotingProcessMode> {

    constructor(httpClient: HttpClient, sharedService: SharedService, authService: AuthService, translate: TranslateService) {
        super(sharedService, httpClient, authService, translate);
        this.controllerName = 'votingProcessMode';
    }
}