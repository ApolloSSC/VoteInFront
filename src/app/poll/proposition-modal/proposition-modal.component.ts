import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';
import { VotingProcess, Option } from '../../model/model';

import { VotingProcessApiService } from '../../services/api/votingProcessApi.service';

@Component({
  selector: 'app-proposition-modal',
  templateUrl: './proposition-modal.component.html',
  styleUrls: ['./proposition-modal.component.sass']
})
export class PropositionModalComponent implements OnInit {
  @Input() public proposition: Option;
  @Input() public cssClass: string;
  @Output() public onValidate = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
    if (!this.proposition.Color) {
    }
  }

  modalActions = new EventEmitter<string|MaterializeAction>();
  openModal() {
    this.modalActions.emit({action: 'modal', params: ['open']});
  }
  closeModal() {
    this.modalActions.emit({action: 'modal', params: ['close']});
  }
  update() {
    this.onValidate.emit(true);
    this.closeModal();
  }

}
