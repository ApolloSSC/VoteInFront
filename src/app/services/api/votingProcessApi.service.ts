// Imports
import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { GenericApiService } from './genericApi.service';
import { SharedService } from '../shared.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

import { VotingProcess, AlternativeVoteResultat, ResultatMajoritaryJudgment, ResultatMajorityVotingProcess } from '../../model/model';

// Decorator to tell Angular that this class can be injected as a service to another class
@Injectable()
export class VotingProcessApiService extends GenericApiService<VotingProcess> {

    constructor(httpClient: HttpClient, sharedService: SharedService, authService: AuthService) {
        super( sharedService, httpClient, authService);
        this.controllerName = 'votingProcess';
    }

    public getByToken(token: string): Observable<VotingProcess> {
        // Return response
        const endpoint = 'getByToken';
        return this.httpClient
            .get(this.apiUrl + this.controllerName + '/' + endpoint + '/' + token)
            .map((res: Response) => this.manageSuccess(res))
            .catch((error: any) => this.manageError(error));
    }

    public getByGuid(guid: string): Observable<VotingProcess> {
        // Return response
        const endpoint = 'getByGuid';
        return this.httpClient
            .get(this.apiUrl + this.controllerName + '/' + endpoint + '/' + guid)
            .map((res: Response) => this.manageSuccess(res))
            .catch((error: any) => this.manageError(error));
    }

    public getResultatJugementMajoritaire(Guid: string): Observable<ResultatMajoritaryJudgment> {
        this.sharedService.startLoading();
        const endpoint = 'resultat';
        // Return response
        return this.httpClient
            .get(this.apiUrl + this.controllerName + '/' + Guid + '/' + endpoint)
            .map((res: Response) => this.manageSuccess(res))
            .catch((error: any) => this.manageError(error));
    }

    public getResultatScrutinMajoritaire(Guid: string): Observable<ResultatMajorityVotingProcess> {
        this.sharedService.startLoading();
        const endpoint = 'resultat';
        // Return response
        return this.httpClient
            .get(this.apiUrl + this.controllerName + '/' + Guid + '/' + endpoint)
            .map((res: Response) => this.manageSuccess(res))
            .catch((error: any) => this.manageError(error));
    }

    public getResultatVoteAlternatif(Guid: string): Observable<AlternativeVoteResultat> {
        this.sharedService.startLoading();
        const endpoint = 'resultat';
        // Return response
        return this.httpClient
            .get(this.apiUrl + this.controllerName + '/' + Guid + '/' + endpoint)
            .map((res: Response) => this.manageSuccess(res))
            .catch((error: any) => this.manageError(error));
    }

    public clore(Guid: string) {
        this.sharedService.startLoading();
        const endpoint = 'clore';

        return this.httpClient
        .post(this.apiUrl + this.controllerName + '/' + Guid + '/' + endpoint, {})
        .map((res: Response) => this.manageSuccess(res))
        .catch((error: any) => this.manageError(error));
    }
}
