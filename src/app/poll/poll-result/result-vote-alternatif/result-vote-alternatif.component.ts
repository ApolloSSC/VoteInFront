import { Component, OnInit, Input } from '@angular/core';

import { AlternativeScoreVote, OptionsModel } from '../../../model/model';

@Component({
  selector: 'app-result-vote-alternatif',
  templateUrl: './result-vote-alternatif.component.html',
  styleUrls: ['./result-vote-alternatif.component.scss']
})
export class ResultVoteAlternatifComponent implements OnInit {

  @Input() Resultat: AlternativeScoreVote;

  options = new Array<OptionsModel>();

  constructor() { }

  ngOnInit() {
  }

}
