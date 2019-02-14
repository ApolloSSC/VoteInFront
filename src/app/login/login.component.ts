import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthViewModel, RegisterViewModel} from '../model/model';

import { SharedService } from '../services/shared.service';
import { AuthService } from '../services/auth/auth.service';
import { error } from 'selenium-webdriver';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor(
    public sharedService:SharedService,
    public router:Router,
    public authService:AuthService
    ) { }

  ngOnInit() {
  }
  
  public loginModel: AuthViewModel = new AuthViewModel();
  public registerModel: RegisterViewModel = new RegisterViewModel();
  
  public loggingIn: boolean = false;
  public registering: boolean = false;

  onSubmitLogin(form: NgForm){
    if(form.valid){
      this.loggingIn = true;
      this.authService.login(this.loginModel).subscribe(
        success => {
          if(success){
            this.router.navigate(["/poll"])
          }
          this.loggingIn = false;
        }
      );
    }
  }

  onSubmitRegister(form: NgForm){
    if(form.valid){
      this.registering = true;
      this.authService.register(this.registerModel).subscribe(
        success => {
          this.authService.login(this.registerModel).subscribe(
            success => {
              if(success){
                this.router.navigate(["/home"])
              }
              this.registering = false;
            },
            error =>{
              this.registering = false;
            }
          );
        },
        error =>{
          this.registering = false;
        }
      );
    }
  }
}
