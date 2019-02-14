import { Component, OnInit, Input } from '@angular/core';
import { ResultatMajoritaryJudgment, ngxItem, ngxScore, ResultatIndividualMajorityJudgment} from '../../../model/model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-result-jugement-majoritaire',
  templateUrl: './result-jugement-majoritaire.component.html',
  styleUrls: ['./result-jugement-majoritaire.component.scss']
})
export class ResultJugementMajoritaireComponent implements OnInit {

  @Input() Resultat: ResultatMajoritaryJudgment;

  public ngxResult: ngxItem[];
  public median: ngxItem;

  public customColors = {
    // domain: [ "#26628A", "#2A9B8A", "#2FAC56", "#54BD34", "#ADCE38", "#DFAB3D", "#F05942"]
    domain: ['#F05942', '#DFAB3D', '#ADCE38', '#54BD34' , '#2FAC56', '#2A9B8A', '#26628A']
    // domain: [ "#27ae60", "#2ecc71", "#3498db", "#2980b9", "#f39c12", "#e74c3c", "#2c3e50"]
  };

  public customColorLine = {
    domain: ['#000000']
  };

  constructor(private translate: TranslateService) { }

  ngOnInit() {
    this.ngxResult = new Array<ngxItem>();

    this.median = new ngxItem();
    this.median.name = this.translate.instant('PollResult.MedianRating');
    this.median.series = new Array<ngxScore>();

    this.Resultat.IndividualResults.forEach(element => {
      const newItem = new ngxItem();
      newItem.name = element.Option.Name;
      newItem.series = new Array<ngxScore>();
      element.Scores.sort((sc1, sc2) => sc1.Choices.Value > sc2.Choices.Value ? 1 : -1).forEach(sc => {
        const newScore = new ngxScore();
        newScore.name = this.translate.instant(sc.Choices.Name);
        newScore.value = sc.Percentage;
        newItem.series.push(newScore);
      });
      this.ngxResult.push(newItem);

      const newMedian = new ngxScore();
      newMedian.name = element.Option.Name;
      newMedian.value = 50;
      this.median.series.push(newMedian);
    });
  }
}
