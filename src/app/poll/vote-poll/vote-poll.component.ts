import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { VotingProcess, Option, Voter, Vote, Envelope, EnvelopeViewModel } from '../../model/model';

import { VotingProcessApiService } from '../../services/api/votingProcessApi.service';
import { EnvelopeApiService } from '../../services/api/envelopeApi.service';
import { SharedService } from '../../services/shared.service';

import { JSEncrypt } from 'jsencrypt';
import * as aesjs from 'aes-js';

import { $ } from 'jquery';
import { AuthService } from '../../services/auth/auth.service';
import * as signalR from '@aspnet/signalr';
import { AppConfig } from '../../app.config';

declare function escape(s: string): string;
declare function unescape(s: string): string;

@Component({
  selector: 'app-vote-poll',
  templateUrl: './vote-poll.component.html',
  styleUrls: ['./vote-poll.component.sass']
})
export class VotePollComponent implements OnInit {

  public hubConnection = new signalR.HubConnectionBuilder().withUrl(AppConfig.settings.serverPath + 'signalr').build();

  public pollGuid: string;
  public token: string;
  public votingProcess: VotingProcess;
  public majoritaryMode: Boolean;
  public isAuthor: Boolean = false;
  public currentUrl: string;
  public currentElecteur: Voter;
  public emailList = '';
  public newElecteursForm: FormGroup;
  public aVote = false;

  private RSA = new JSEncrypt();

  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private votingProcessApiService: VotingProcessApiService,
    private voteApiService: EnvelopeApiService,
    private sharedService: SharedService,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.currentUrl = window.location.href;

    this.hubConnection.start().catch(err => document.write(err));

    this.activatedRoute.params.subscribe((params: Params) => {
      this.pollGuid = params['guid'];
      if (this.pollGuid) {
        this.votingProcessApiService.getByGuid(this.pollGuid).subscribe(
          res => {
            this.votingProcess = Object.assign(new VotingProcess(), res);

            const guidLS = localStorage.getItem('votingProcess' + res.Guid.toString());
            const guidAVote = localStorage.getItem('avote-scrutin-' + res.Guid.toString());
            this.isAuthor = false;
            // check auteur
            if (this.votingProcess.IdUser) {
              if (this.authService.loggedIn() && this.authService.getUser().Id === this.votingProcess.IdUser) {
                this.isAuthor = true;
              }
            } else {
              if (guidLS === res.Guid.toString()) {
                this.isAuthor = true;
              } else if (guidAVote === res.Guid.toString()) {// check à voté
                this.aVote = true;
              }
            }

            if (!this.votingProcess.Public && !this.isAuthor) {
              // this.scrutin = null;
            }
          });
      } else {
        const token = params['token'];
        this.token = token;
        // TODO get scrutin par token electeur
        this.votingProcessApiService.getByToken(token).subscribe(s => {
          this.votingProcess = Object.assign(new VotingProcess(), s);
        });
      }

    });
    this.newElecteursForm = new FormGroup({
      'newElecteurs': new FormControl(this.emailList, [
        Validators.required,
        Validators.minLength(4),
        this.invalidEmailsValidator() // <-- Here's how you pass in the custom validator.
      ]),
      // 'alterEgo': new FormControl(this.hero.alterEgo),
      // 'power': new FormControl(this.hero.power, Validators.required)
    });
  }
  public get newElecteurs() { return this.newElecteursForm.get('newElecteurs'); }

  invalidEmailsValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const valid = /^[\W]*([\w+\-.%]+@[\w\-.]+\.[A-Za-z]{2,4}[\W]*;{1}[\W]*)*([\w+\-.%]+@[\w\-.]+\.[A-Za-z]{2,4})[\W]*$/
        .test(control.value);
      return (!valid) ? { 'invalidEmails': { value: control.value } } : null;
    };
  }

  onDelete() {
    this.route.navigate(['/']);
  }

  addElecteurs(value: any) {
    this.emailList = this.newElecteurs.value;
    const prevElecteurs = this.votingProcess.Voter;
    const emails: string[] = this.emailList.split(';').map(s => s.trim());
    emails.forEach(email => {
      if (email.length > 0) {
        const electeur = new Voter();
        electeur.HasVoted = false;
        electeur.Mail = email;
        electeur.Token = Math.random().toString(36).substr(2);
        electeur.IdVotingProcess = this.votingProcess.Id;
        if (!this.votingProcess.Voter) {
          this.votingProcess.Voter = new Array<Voter>();
        }
        this.votingProcess.Voter.push(electeur);
      }
    });
    this.votingProcessApiService.update(this.votingProcess.Id, this.votingProcess).subscribe(s => {
      this.emailList = '';
      this.newElecteurs.setValue('');
    }, err => { this.votingProcess.Voter = prevElecteurs; });
  }

  vote(vote: Vote) {

    const envelopeVM = new EnvelopeViewModel();
    envelopeVM.Envelope = new Envelope();
    envelopeVM.Envelope.IdVotingProcess = vote.IdVotingProcess;
    envelopeVM.IdElecteur = vote.IdVoter;
    // récuperation du token
    if (this.token) {
      envelopeVM.Token = this.token;
    }

    // Réduire la taille du json si nécessaire
    const essVote = vote.getEssential();

    // Générer une clé AES de 16 octets
    const AESKey = this.sharedService.randomAESKey(16);

    // Transformer le json en bytes, puis le crypter et l'enregistrer en Base64 string
    const jsonBytes = this.string2Bin(JSON.stringify(essVote));
    const aesCtr = new aesjs.ModeOfOperation.ctr(AESKey);
    envelopeVM.Envelope.Content = this.Uint8ToBase64(aesCtr.encrypt(jsonBytes));

    // Crypter la clé AES avec la clé publique RSA, et la joindre à l'envelope
    this.RSA.setPublicKey(this.votingProcess.PublicKey);
    envelopeVM.Envelope.Key = this.RSA.encrypt(this.Uint8ToBase64(AESKey));

    this.voteApiService.voter(envelopeVM).subscribe(
      res => {
        localStorage.setItem('avote-scrutin-' + this.votingProcess.Guid.toString(), this.votingProcess.Guid.toString());
        this.aVote = true;
    });

    this.hubConnection.invoke('VoteAdded', this.votingProcess.Guid).catch((err => { console.error(err); }));
  }

  private string2Bin(str) {
    const result = [];
    for (let i = 0; i < str.length; i++) {
      result.push(str.charCodeAt(i));
    }
    return result;
  }

  private Base64ToUint8(string) {
    const str = btoa(unescape(encodeURIComponent(string))),
      charList = str.split(''),
      uintArray = [];
    for (let i = 0; i < charList.length; i++) {
      uintArray.push(charList[i].charCodeAt(0));
    }
    return new Uint8Array(uintArray);
  }

  private Uint8ToBase64(array) {
    return btoa(String.fromCharCode.apply(null, array));
  }

  public UTF8ToUint8(stringValue) {
    const bytes = [];
    for (let i = 0; i < stringValue.length; ++i) {
      bytes.push(stringValue.charCodeAt(i));
    }
    return bytes;
  }

  public Uint8ToUTF8(utftext) {
    let result = '';
    for (let i = 0; i < utftext.length; i++) {
      result += String.fromCharCode(parseInt(utftext[i], 10));
    }
    return result;
  }
}
