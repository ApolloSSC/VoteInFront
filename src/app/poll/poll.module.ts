import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragulaModule } from 'ng2-dragula';

import { SharedModule } from '../shared/shared.module';
import { PollListComponent } from './poll-list/poll-list.component';
import { CreatePollComponent } from './create-poll/create-poll.component';
import { VotePollComponent } from './vote-poll/vote-poll.component';
import { MajoritaryVotingProcessVoteComponent } from './vote-poll/majoritary-voting-process-vote/majoritary-voting-process-vote.component';
import { MajoritaryJudgmentVoteComponent } from './vote-poll/majoritary-judgment-vote/majoritary-judgment-vote.component';
import { PollDetailComponent } from './poll-detail/poll-detail.component';
import { PropositionModalComponent } from './proposition-modal/proposition-modal.component';
import { AlternativeVoteComponent } from './vote-poll/alternative-vote/alternative-vote.component';

import { PollResultModule } from './poll-result/poll-result.module';
import { ShareButtonsModule } from '@ngx-share/buttons';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DragulaModule.forRoot(),
    PollResultModule,
    ShareButtonsModule
  ],
  declarations: [
    PollListComponent,
    CreatePollComponent,
    VotePollComponent,
    MajoritaryVotingProcessVoteComponent,
    MajoritaryJudgmentVoteComponent,
    PollDetailComponent,
    PropositionModalComponent,
    AlternativeVoteComponent
  ]
})
export class PollModule { }
