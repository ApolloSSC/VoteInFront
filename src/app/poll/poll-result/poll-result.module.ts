import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PollResultComponent } from './poll-result.component';
import { ResultJugementMajoritaireComponent } from './result-jugement-majoritaire/result-jugement-majoritaire.component';
import { ResultScrutinMajoritaireComponent } from './result-scrutin-majoritaire/result-scrutin-majoritaire.component';
import { ResultVoteAlternatifComponent } from './result-vote-alternatif/result-vote-alternatif.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartJugementMajoritaireComponent } from './result-jugement-majoritaire/chart-jugement-majoritaire/chart-jugement-majoritaire.component';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    NgxChartsModule,
    ShareButtonsModule,
    TranslateModule
  ],
  declarations: [
    PollResultComponent,
    ResultJugementMajoritaireComponent,
    ResultScrutinMajoritaireComponent,
    ResultVoteAlternatifComponent,
    ChartJugementMajoritaireComponent
  ]
})
export class PollResultModule { }
