// Imports
import { Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SharedService } from '../shared.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { isDevMode } from '@angular/core';
import { AppConfig } from '../../app.config';
import { TranslateService } from '@ngx-translate/core';

// Decorator to tell Angular that this class can be injected as a service to another class
export abstract class GenericApiService<T> {

    protected MSG_CREATE_SUCCESS = this.translate.instant('Shared.SaveSuccess');
    protected MSG_UPDATE_SUCCESS = this.translate.instant('Shared.SaveSuccess');
    protected MSG_DELETE_SUCCESS = this.translate.instant('Shared.DeleteSuccess');

    protected optionsApplicationJson = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }) });

    // Class constructor with Jsonp injected
    constructor(
        protected sharedService: SharedService,
        protected httpClient: HttpClient,
        protected authService: AuthService,
        protected translate: TranslateService
    ) {
    }

    // Base URL for API
    protected apiUrl = AppConfig.settings.serverPath + 'api/';
    // protected apiUrl = "https://voteinback.azurewebsites.net/api/";
    protected controllerName = '';

    get(): Observable<T[]> {
        this.sharedService.startLoading();
        // Return response
        return this.httpClient
            .get<T[]>(this.apiUrl + this.controllerName)
            .map((res: T[]) => this.manageSuccess(res))
            .catch((error: any) => this.manageError(error));
    }

    // get a pet based on their id
    getById(id: string): Observable<T> {
        this.sharedService.startLoading();

        // End point for list of pets:
        const endPoint = '/' + id;

        // Return response
        return this.httpClient
            .get(this.apiUrl + this.controllerName + endPoint)
            .map((res: T) => this.manageSuccess(res))
            .catch((error: any) => this.manageError(error));
    }
    update(id: any, obj: T, notification: boolean = true): Observable<T> {
        const endPoint = '/' + id;
        if (notification) {
            this.sharedService.startLoading();
            return this.httpClient
                .put(this.apiUrl + this.controllerName + endPoint, obj)
                .map((res: T) => this.manageSuccess(res, this.MSG_UPDATE_SUCCESS))
                .catch((error: any) => this.manageError(error));
        } else {
            return this.httpClient
                .put(this.apiUrl + this.controllerName + endPoint, obj)
                .map((res: T) => this.manageSuccess(res, null, false))
                .catch((error: any) => this.manageError(error));
        }
    }

    create(obj: T, notification: boolean = true): Observable<T> {
        const endPoint = '/';
        if (notification) {
            this.sharedService.startLoading();
            return this.httpClient
                .post(this.apiUrl + this.controllerName + endPoint, obj)
                .map((res: T) => this.manageSuccess(res, this.MSG_CREATE_SUCCESS))
                .catch((error: any) => this.manageError(error));
        } else {
            return this.httpClient
                .post(this.apiUrl + this.controllerName + endPoint, obj)
                .map((res: T) => this.manageSuccess(res, null, false))
                .catch((error: any) => this.manageError(error));
        }

    }

    delete(id: any): Observable<T> {
        this.sharedService.startLoading();
        const endPoint = '/' + id;

        return this.httpClient
            .delete(this.apiUrl + this.controllerName + endPoint)
            .map((res: any) => this.manageSuccess(res, this.MSG_DELETE_SUCCESS))
            .catch((error: any) => this.manageError(error));
    }

    protected manageError(error: any) {
        this.sharedService.endLoading();
        // Déconnecter si jeton non-valide
        if (error.statusText === 'Unauthorized') {
            this.authService.logout();
        }
        if (error.json &&  error.json() && error.json().ExceptionMessage) {
            this.sharedService.successToast(error.json().ExceptionMessage);
        } else {
            this.sharedService.errorToast(this.translate.instant('Shared.ServerError'));
        }
        return Observable.throw( (error.json ? error.json().error : error) || this.translate.instant('Shared.ServerError'));
    }
    protected manageSuccess(res: any, toastMsg?: string, splash: boolean = true) {
        if (splash) {
            this.sharedService.endLoading();
        }
        if (toastMsg) {
            this.sharedService.successToast(toastMsg);
        }
        if (res) {
            return res;
        }
        return null;
    }
}
