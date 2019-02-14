import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SharedService } from '../services/shared.service';
import { Router, Params, ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { ResetPasswordViewModel } from '../model/model';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.sass']
})
export class PasswordComponent implements OnInit {

  constructor(
    public sharedService:SharedService,
    public router:Router,
    public authService:AuthService,
    public activatedRoute: ActivatedRoute
    ) { }

  public submitting: boolean = false;
  public submited: boolean = false;
  public email: string;
  public code: string;
  public resetPasswordViewModel: ResetPasswordViewModel;

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.code = params['c'];
      if (this.code) {
        this.resetPasswordViewModel = new ResetPasswordViewModel();
      }
    });
  }

  onSubmit(form: NgForm){
    if(form.valid && !this.submitting){
      this.submitting = true;
      let vm = new ResetPasswordViewModel();
      vm.Email = this.email;
      this.authService.generateNewPasswordLink(vm).subscribe(
        success => {
          this.sharedService.successToast("Demande envoyée");
          this.submitting = false;
          this.submited = true;
        },
        error =>{
          this.submitting = false;
        }
      );
    }
  }

  
  onSubmitNewPassword(form: NgForm){
    if(form.valid && this.resetPasswordViewModel.Password == this.resetPasswordViewModel.ConfirmPassword && !this.submitting){
      this.submitting = true;
      this.resetPasswordViewModel.Code = this.code;
      this.authService.resetPassword(this.resetPasswordViewModel).subscribe(
        success => {
          this.sharedService.successToast("Mot de passe réinitialisé avec succès");
          this.router.navigate(["/login"]);
          this.submitting = false;
        },
        error =>{
          this.submitting = false;
        }
      );
    }
  }
}
