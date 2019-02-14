import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';
import { VotingProcess, Option } from '../../model/model';

import { VotingProcessApiService } from '../../services/api/votingProcessApi.service';
import { Router } from '@angular/router';
import * as signalR from '@aspnet/signalr';
import { AppConfig } from '../../app.config';

@Component({
  selector: '[app-poll-detail]',
  templateUrl: './poll-detail.component.html',
  styleUrls: ['./poll-detail.component.sass']
})
export class PollDetailComponent implements OnInit {

  @Input() public votingProcess: VotingProcess;
  @Input() public isSingle: boolean;
  @Output() onDelete = new EventEmitter<boolean>();
  @Output() onCloture = new EventEmitter<boolean>();

  public hubConnection = new signalR.HubConnectionBuilder().withUrl(AppConfig.settings.serverPath + 'signalr').build();
  public basePath = window.location.origin;

  public isCreated = false;
  public isOpened = false;
  public isClosed = false;

  public modalSuppressionActions = new EventEmitter<string|MaterializeAction>();
  public modalSuppressionPropositionActions = new EventEmitter<string|MaterializeAction>();
  public modalClotureActions = new EventEmitter<string|MaterializeAction>();
  private deletingProp: Option;

  constructor(
    private votingProcessApiService: VotingProcessApiService,
    private router: Router) {}

  ngOnInit() {
    this.isCreated = (this.votingProcess.ClosingDate == null && this.votingProcess.OpeningDate == null);
    this.isOpened = (this.votingProcess.ClosingDate == null && this.votingProcess.OpeningDate != null);
    this.isClosed = (this.votingProcess.ClosingDate != null);

    this.hubConnection.on('VoteAdded' + this.votingProcess.Guid, () => { this.votingProcess.NbVotes = this.votingProcess.NbVotes + 1; });
    this.hubConnection.start().catch(err => document.write(err));
  }

  openModalSuppression() {
    this.modalSuppressionActions.emit({action: 'modal', params: ['open']});
  }

  closeModalSuppression() {
    this.modalSuppressionActions.emit({action: 'modal', params: ['close']});
  }

  delete() {
    this.votingProcessApiService.delete(this.votingProcess.Guid).subscribe(res => {
      this.closeModalSuppression();
      this.onDelete.emit(true);
    }, err => {
      console.log(err);
    });
  }

  tryDeleteProposition(proposition: Option) {
    this.deletingProp = proposition;
    if (this.votingProcess.NbVotes > 0) {
      this.modalSuppressionPropositionActions.emit({action: 'modal', params: ['open']});
    } else {
      this.deleteProposition();
    }
  }

  deleteProposition() {
    const index = this.votingProcess.options.indexOf(this.deletingProp);
    if (index > -1) {
      const tempArray = this.votingProcess.options;
      tempArray.splice(index, 1);
      this.votingProcess.options = tempArray;
      this.votingProcessApiService.update(this.votingProcess.Guid, this.votingProcess)
        .subscribe(res => {
          this.closeModalCloture();
        }, err => {
      });
    }
  }

  closeModalSuppressionProposition() {
    this.modalSuppressionPropositionActions.emit({action: 'modal', params: ['close']});
  }

  save($event) {
    this.votingProcessApiService.update(this.votingProcess.Guid, this.votingProcess).subscribe(res => {}, err => {});
  }

  openModalCloture() {
    this.modalClotureActions.emit({action: 'modal', params: ['open']});
  }

  closeModalCloture() {
    this.modalClotureActions.emit({action: 'modal', params: ['close']});
  }

  cloturer() {
    this.votingProcess.ClosingDate = new Date();
    this.votingProcessApiService.clore(this.votingProcess.Guid).subscribe(res => {
      this.isClosed = true;
      this.closeModalCloture();
      this.onCloture.emit(true);
      this.router.navigate(['/poll', this.votingProcess.Guid, 'result']);
    }, err => {

    });
  }

  getCompleteClass() {
    if (this.votingProcess.Voter && this.votingProcess.Voter.length > this.votingProcess.NbVotes) {
      return 'incomplete';
    } else if (this.votingProcess.Voter
      && this.votingProcess.Voter.length === this.votingProcess.NbVotes
      && this.votingProcess.NbVotes > 0) {
      return 'complete';
    }
  }
}
