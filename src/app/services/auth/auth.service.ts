import { Injectable, isDevMode } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs/Rx';
import { SharedService } from '../shared.service';
import { JwtHelperService } from '@auth0/angular-jwt';
const helper = new JwtHelperService();

import { RegisterViewModel, AuthViewModel, AuthToken, User, ResetPasswordViewModel } from '../../model/model';
import { AppConfig } from '../../app.config';

@Injectable()
export class AuthService {


  constructor(
    protected httpClient: HttpClient, 
    protected sharedService: SharedService,
    protected router: Router
  ) { 


  }

  protected apiUrl = AppConfig.settings.serverPath + "api/";
  protected controllerName = "Auth";

  public currentUserName: string;

  register(vm: RegisterViewModel): Observable<any>{
    let endPoint = "register";
      return this.httpClient
      .post(this.apiUrl + this.controllerName + '/' + endPoint, vm)
      .map((res: Response) => this.manageSuccess(res))
      .catch((error: any) => this.manageError(error));
  }

  private getToken(vm: AuthViewModel): Observable<AuthToken>{
    let endPoint = "getToken";

    return this.httpClient
      .post(this.apiUrl + this.controllerName + '/' + endPoint, vm)
      .map((res: AuthToken) => this.manageSuccess(res))
      .catch((error: any) => this.manageError(error));
  }

  login(vm: AuthViewModel): Observable<any>{
    let subject = new Subject<boolean>();

    this.getToken(vm).subscribe(
      token => {
        console.log(token);
        localStorage.setItem("token", token.accessToken);
        subject.next(true);
        this.currentUserName = vm.UserName;
      },
      error =>{
        subject.next(false);
      }
    );

    return subject;
  }

  logout(): void{
    localStorage.removeItem("token");
    this.router.navigateByUrl('/home');
  }

  loggedIn(): boolean{
    return this.tokenNotExpired();
  }

  tokenNotExpired(): boolean{
    let token = localStorage.getItem('token');
    var isExpired = helper.isTokenExpired(token);
    return !isExpired;
  }

  getUser(): User{
    if (this.loggedIn()){
      let user: User = null;
      let token = localStorage.getItem('token');
      if(token != null){
        user = helper.decodeToken(token);
      }
      return user; 
    }
    return null;
  }

  
  generateNewPasswordLink(vm: ResetPasswordViewModel): Observable<any> {
    let endPoint = "generateNewPasswordLink";
    return this.httpClient
      .post(this.apiUrl + this.controllerName + '/' + endPoint, vm)
      .map((res: Response) => this.manageSuccess(res))
      .catch((error: any) => this.manageError(error));
  }
  

  resetPassword(vm: ResetPasswordViewModel): Observable<any> {
    let endPoint = "ResetPassword";
    return this.httpClient
      .post(this.apiUrl + this.controllerName + '/' + endPoint, vm)
      .map((res: Response) => this.manageSuccess(res))
      .catch((error: any) => this.manageError(error));
  }

  private manageError(error: any) {
      this.sharedService.endLoading();
      //unauthorized
      if(error && error.status == 401){
        this.sharedService.errorToast("Identifiants incorrects");
      }
      else if(error && error.error){
        let err = error.error;
        if(err.length > 0){
          if(err[0].Code == 'DuplicateUserName'){
            this.sharedService.errorToast("Cet utilisateur existe déjà");
          }
          if(err[0].Code == 'InvalidUserName'){
            this.sharedService.errorToast("Le nom d'utilisateur ne doit contenir que des lettres ou chiffres");
          }
        }
      }
      else if (error.json && error.json() && error.json().ExceptionMessage) {
          this.sharedService.successToast(error.json().ExceptionMessage);
      }
      else {
          this.sharedService.errorToast('Erreur Serveur');
      }
      return Observable.throw( (error.json ? error.json().error : error) || 'Server error');
  }
  private manageSuccess(res: any, toastMsg?: string, splash: boolean = true) {
      if(splash)
          this.sharedService.endLoading();
      if (toastMsg) {
          this.sharedService.successToast(toastMsg);
      }
      if(res)
        return res;
      return null;
  }
}
