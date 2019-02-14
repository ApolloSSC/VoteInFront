import {Router, ActivatedRoute, Params} from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { VotingProcess, Option, MajoritaryVotingProcessVote, Vote, Voter } from '../../../model/model';

import { EnvelopeApiService } from '../../../services/api/envelopeApi.service';
import { VotingProcessApiService } from '../../../services/api/votingProcessApi.service';
import { SharedService } from '../../../services/shared.service';

import { $ } from 'jquery';

@Component({
  selector: 'app-vote-scrutin-majoritaire',
  templateUrl: './majoritary-voting-process-vote.component.html',
  styleUrls: ['./majoritary-voting-process-vote.component.sass']
})
export class MajoritaryVotingProcessVoteComponent implements OnInit {
  public pollId: string;
  @Input() public votingProcess: VotingProcess;
  @Output() public onVote = new EventEmitter<Vote>();
  public voteProportionnel: MajoritaryVotingProcessVote;

  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private scrutinApiService: VotingProcessApiService,
    private voteApiService: EnvelopeApiService,
    private sharedService: SharedService) { }

  ngOnInit() {}

  selectCandidate(proposition: Option) {
    this.voteProportionnel = new MajoritaryVotingProcessVote(this.votingProcess, proposition);
  }

  vote() {
    this.onVote.emit(this.voteProportionnel);
  }

  isSelected(proposition: Option) {
    if (this.voteProportionnel != null) {
      return proposition.Id === this.voteProportionnel.IdOption;
    }
    return false;
  }

  isVote() {
    return this.voteProportionnel == null;
  }
}
