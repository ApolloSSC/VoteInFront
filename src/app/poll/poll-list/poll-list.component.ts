import { Component, OnInit } from '@angular/core';
import { VotingProcess } from '../../model/model';
import { Router } from '@angular/router';

import { VotingProcessApiService } from '../../services/api/votingProcessApi.service';
import { VotingProcessModeApiService } from '../../services/api/votingProcessModeApi.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-poll-list',
  templateUrl: './poll-list.component.html',
  styleUrls: ['./poll-list.component.sass']
})
export class PollListComponent implements OnInit {

  public pollList: VotingProcess[];
  public currentPolls: VotingProcess[];
  public pastPolls: VotingProcess[];

  constructor(private votingProcessApiService: VotingProcessApiService,
    private router: Router) {}

  ngOnInit() {
    this.votingProcessApiService.get().subscribe(
      res => {
        this.pollList = new Array<VotingProcess>();
        res.forEach(scr => {
          this.pollList.push(Object.assign(new VotingProcess(), scr));
        });

        this.currentPolls = this.pollList.filter(pl => pl.ClosingDate == null);
        this.pastPolls = this.pollList.filter(pl => pl.ClosingDate != null);
      });
  }

  removeCurrent(poll: VotingProcess) {
    const index = this.currentPolls.indexOf(poll);
    if (index > -1) {
      this.currentPolls.splice(index, 1);
    }
  }

  removeOld(poll: VotingProcess) {
    const index = this.pastPolls.indexOf(poll);
    if (index > -1) {
      this.pastPolls.splice(index, 1);
    }
  }

  closeCurrent(poll: VotingProcess) {
    const index = this.currentPolls.indexOf(poll);
    if (index > -1) {
      this.currentPolls.splice(index, 1);
      this.pastPolls.unshift(poll);
    }
  }
}
