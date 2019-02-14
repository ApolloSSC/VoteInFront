import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MajoritaryVotingProcessVoteComponent } from './majoritary-voting-process-vote.component';

describe('VoteComponent', () => {
  let component: MajoritaryVotingProcessVoteComponent;
  let fixture: ComponentFixture<MajoritaryVotingProcessVoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MajoritaryVotingProcessVoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MajoritaryVotingProcessVoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
