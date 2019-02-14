import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

import { ResultatMajorityVotingProcess, ngxScore } from '../../../model/model';

@Component({
  selector: 'app-result-scrutin-majoritaire',
  templateUrl: './result-scrutin-majoritaire.component.html',
  styleUrls: ['./result-scrutin-majoritaire.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ResultScrutinMajoritaireComponent implements OnInit {

  @Input() Resultat: ResultatMajorityVotingProcess;

  public customColors = {
    domain: [ '#26628A', '#2A9B8A', '#2FAC56', '#54BD34', '#ADCE38', '#DFAB3D', '#F05942']
  };

  public ngxResult: ngxScore[];
  public ngxResultPrev: ngxScore[];

  constructor() { }

  ngOnInit() {
    this.ngxResult = this.mapResultatToNgxModel(this.Resultat);
    if (this.Resultat.PreviousRoundResultat) {
      this.ngxResultPrev = this.mapResultatToNgxModel(this.Resultat.PreviousRoundResultat);
    }
  }

  private mapResultatToNgxModel(rsm: ResultatMajorityVotingProcess): ngxScore[] {
    const ngx = new Array<ngxScore>();
    rsm.IndividualResults.forEach(element => {
      const newScore = new ngxScore();
      newScore.name = element.Option.Name;
      newScore.value = element.Votes;
      ngx.push(newScore);
    });
    return ngx;
  }

}
