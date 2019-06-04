import { Component, OnInit, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MaterializeAction } from 'angular2-materialize';

import { Option, VotingProcessMode, VotingProcess } from '../../model/model';

import { VotingProcessApiService } from '../../services/api/votingProcessApi.service';
import { VotingProcessModeApiService } from '../../services/api/votingProcessModeApi.service';
import { SharedService } from '../../services/shared.service';
import { AuthService } from '../../services/auth/auth.service';

import {JSEncrypt} from 'jsencrypt';
import { ConstantsService } from '../../shared/constants.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-create-poll',
  templateUrl: './create-poll.component.html',
  styleUrls: ['./create-poll.component.sass']
})
export class CreatePollComponent implements OnInit {
  public poll: VotingProcess = new VotingProcess();
  public votingProcessModes: Array < VotingProcessMode > ;
  public newProposition: Option = new Option();
  public loggedIn = false;
  public encrypt = new JSEncrypt({
    'default_key_size': 2048
  });

  constructor(
    private votingProcessApiService: VotingProcessApiService,
    private votingProcessModeApiService: VotingProcessModeApiService,
    private sharedService: SharedService,
    private router: Router,
    private authService: AuthService,
    public translate: TranslateService
  ) {}

  ngOnInit() {
    this.votingProcessModeApiService.get().subscribe(
      res => {
        // On enlève le mode condorcet randomisé de l'interface
        this.votingProcessModes = res.filter(m => m.Code != 'condorcet-randomise');
      },
      err => console.log(err)
    );
    this.poll.options = new Array < Option > ();
    this.poll.Public = true;
    this.loggedIn = this.authService.loggedIn();
    if (this.loggedIn) {
      const user = this.authService.getUser();
      this.poll.AuthorMail = user.Email;
      this.poll.Author = user.UserName;
      this.poll.IdUser = user.Id;
    }
  }
  modalRSAActions = new EventEmitter < string | MaterializeAction > ();
  openModalRSA() {
    this.modalRSAActions.emit({
      action: 'modal',
      params: ['open']
    });
  }
  closeModalRSA() {
    this.modalRSAActions.emit({
      action: 'modal',
      params: ['close']
    });
  }

  isPollOk(f: NgForm) {
    return f.valid && this.poll.options && this.poll.options.length >= 2;
  }
  onSubmit(f: NgForm) {
    if (f.valid) {
      // RVI: disable Modal for V1
      this.sendVotingProcess(this.encrypt.getPrivateKeyB64());
      // this.openModalRSA();
    }
  }

  sendVotingProcess(privateKey ?: string) {
    // Set date ouverture
    this.poll.OpeningDate = new Date();
    this.poll.PublicKey = this.encrypt.getPublicKeyB64();
    this.poll.MyPrivateKey = privateKey;

    this.votingProcessApiService.create(this.poll).subscribe(
      res => {
        localStorage.setItem('scrutin' + res.Guid, res.Guid.toString());
        this.closeModalRSA();
        this.router.navigate(['/poll', res.Guid]);
      },
      error => {
        console.log(error);
      }
    );
  }

  addNewProposition() {
    if (this.newProposition.Name) {
      const tempArray = this.poll.options;
      // Add default color
      this.newProposition.Color = ConstantsService.pickerColors[(tempArray.length % ConstantsService.pickerColors.length)];
      tempArray.push(this.newProposition);
      this.poll.options = tempArray;
      this.newProposition = new Option();
    }
  }

  removeProposition(prop: Option) {
    const tempArray = this.poll.options;
    const index = tempArray.indexOf(prop, 0);
    if (index > -1) {
      tempArray.splice(index, 1);
      this.poll.options = tempArray;
    }
  }

  isLoading() {
    return this.sharedService.loading;
  }

  copyKey(keyTextarea) {
    keyTextarea.select();
    document.execCommand('Copy');
  }

  getModeName(mode: VotingProcessMode) {
    switch (mode.Code) {
      case 'jugement-majoritaire':
        return this.translate.instant('Mode.MajoritaryJudgment');
      case 'scrutin-majoritaire':
        return this.translate.instant('Mode.MajoritaryVotingProcess');
      case 'vote-alternatif':
        return this.translate.instant('Mode.AlternativeVote');
    }
  }
}
