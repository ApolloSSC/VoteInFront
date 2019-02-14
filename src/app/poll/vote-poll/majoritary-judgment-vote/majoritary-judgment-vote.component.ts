import {Router, ActivatedRoute, Params} from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { VotingProcess, Option, MajoritaryJudgmentVote, Choice, OptionChoice, Voter, Vote } from '../../../model/model';

import { VotingProcessApiService } from '../../../services/api/votingProcessApi.service';
import { EnvelopeApiService } from '../../../services/api/envelopeApi.service';
import { SharedService } from '../../../services/shared.service';

declare var $;

@Component({
  selector: 'app-vote-jugement-majoritaire',
  templateUrl: './majoritary-judgment-vote.component.html',
  styleUrls: ['./majoritary-judgment-vote.component.sass']
})
export class MajoritaryJudgmentVoteComponent implements OnInit {
  public pollId: string;
  @Input() public votingProcess: VotingProcess;
  @Output() public onVote = new EventEmitter<Vote>();
  public voteMajoritaire: MajoritaryJudgmentVote;

  constructor(private route: Router,
    private activatedRoute: ActivatedRoute,
    private scrutinApiService: VotingProcessApiService,
    private sharedService: SharedService,
    private voteApiService: EnvelopeApiService) { }

  ngOnInit() {
    this.votingProcess.VotingProcessMode.Choice = this.votingProcess.VotingProcessMode.Choice.sort((c1, c2) => c1.Value < c2.Value ? 1 : -1);
    this.voteMajoritaire = new MajoritaryJudgmentVote(this.votingProcess, new Array<OptionChoice>());
  }

  selectGrade(proposition: Option, choice: Choice) {
    $('.dropdown-button').dropdown('close');
    const existingOC = this.voteMajoritaire.OptionChoice.find(pc => pc.IdOption == proposition.Id);
    if (existingOC) {
      existingOC.Choice = choice;
      existingOC.IdChoice = choice.Id;
    } else {
      const a = new OptionChoice(proposition.Id, choice.Id);
      a.Choice = choice;
      this.voteMajoritaire.OptionChoice.push(a);
    }
  }

  getChoixForPropositon(proposition: Option): Choice {
    if (this.voteMajoritaire.OptionChoice != null) {
      const existingOC = this.voteMajoritaire.OptionChoice.find(oc => oc.IdOption == proposition.Id);
      if (existingOC) {
        return existingOC.Choice;
      }
    }
    return null;
  }

  vote() {
    this.onVote.emit(this.voteMajoritaire);
  }

  isVoteOk() {
    if (this.votingProcess && this.votingProcess.options) {
      if (this.voteMajoritaire.OptionChoice) {
        return this.voteMajoritaire.OptionChoice.length == this.votingProcess.options.length;
      }
    }
    return false;
  }

  getChoixClass(choice: Choice): string {
    if (!choice) {
      return '';
    }
    switch (choice.Value) {
      case 0:
        return 'btn-grade grade-to-reject';
      case 1:
        return 'btn-grade grade-insufficient';
      case 2:
        return 'btn-grade grade-fair';
      case 3:
        return 'btn-grade grade-fairly-well';
      case 4:
        return 'btn-grade grade-good';
      case 5:
        return 'btn-grade grade-very-good';
      case 6:
        return 'btn-grade grade-excellent';
      default:
        return '';
    }
  }
}
