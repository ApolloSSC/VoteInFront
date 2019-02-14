import {Router, ActivatedRoute, Params} from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { DragulaService } from 'ng2-dragula';

import { VotingProcess, Option, AlternativeVote, Choice, OptionChoice, Voter, Vote } from '../../../model/model';

import { VotingProcessApiService } from '../../../services/api/votingProcessApi.service';
import { EnvelopeApiService } from '../../../services/api/envelopeApi.service';
import { SharedService } from '../../../services/shared.service';

import * as autoScroll from 'dom-autoscroller';

@Component({
  selector: 'app-vote-alternatif',
  templateUrl: './alternative-vote.component.html',
  styleUrls: ['./alternative-vote.component.sass']
})
export class AlternativeVoteComponent implements OnInit {

  @Input() public votingProcess: VotingProcess;
  @Output() public onVote = new EventEmitter<Vote>();
  public propositions: Option[] = [];
  public ranking: Option[] = [];
  public alternativeVote: AlternativeVote;

  constructor(private route: Router,
    private activatedRoute: ActivatedRoute,
    private voteProcessApiService: VotingProcessApiService,
    private sharedService: SharedService,
    private voteApiService: EnvelopeApiService,
    private dragulaService: DragulaService) {
      this.dragulaService.createGroup('left', {
        copyItem: (item: Option) => (item)
      });
  }

  @ViewChild('autoscroll') autoscroll: ElementRef;

  ngOnInit() {
    this.alternativeVote = new AlternativeVote(this.votingProcess, new Array<Option>());

    setTimeout(() => {
      const scroll = autoScroll([
        this.autoscroll.nativeElement
      ], {
        margin: 20,
        maxSpeed: 5,
        scrollWhenOutside: true,
        autoScroll: function() {
          // Only scroll when the pointer is down.
          return this.down;
          // return true;
        }
      });
    }, 3000);
    this.propositions = this.votingProcess.options.slice(0);
  }

  vote() {
    this.alternativeVote.Ranking = this.ranking;
    this.onVote.emit(this.alternativeVote);
  }

  isVoteOk() {
    return this.votingProcess && this.votingProcess.options && this.votingProcess.options.length == this.ranking.length;
  }
}
