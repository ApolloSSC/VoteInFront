import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import { VotingProcess, Option, ResultatModelBase, ResultatIndividuelModelBase, IResultatModel } from '../../model/model';

import { VotingProcessApiService } from '../../services/api/votingProcessApi.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-poll-result',
  templateUrl: './poll-result.component.html',
  styleUrls: ['./poll-result.component.sass']
})
export class PollResultComponent implements OnInit {

  public winner: Option;
  public modeScrutin: string;
  public resultat: IResultatModel;
  public votingProcess: VotingProcess;
  constructor(
    private activatedRoute: ActivatedRoute,
    private votingProcessApiService: VotingProcessApiService,
    private sharedService: SharedService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      const pollGuid = params['guid'];
      this.votingProcessApiService.getByGuid(pollGuid).subscribe(p => {
        this.votingProcess = p;
        if (p.VotingProcessMode) {
          this.modeScrutin = p.VotingProcessMode.Code;
          switch (this.modeScrutin) {
            case 'jugement-majoritaire':
              this.votingProcessApiService.getResultatJugementMajoritaire(pollGuid).subscribe(
                res => {
                  this.resultat = res;
                }
              );
              break;
            case 'scrutin-majoritaire':
              this.votingProcessApiService.getResultatScrutinMajoritaire(pollGuid).subscribe(
                res => {
                  this.resultat = res;
                }
              );
              break;
            case 'vote-alternatif':
              this.votingProcessApiService.getResultatVoteAlternatif(pollGuid).subscribe(
                res => {
                  this.resultat = res;
                }
              );
              break;
            default:
              break;
          }
        }
      });
    });
  }
}
