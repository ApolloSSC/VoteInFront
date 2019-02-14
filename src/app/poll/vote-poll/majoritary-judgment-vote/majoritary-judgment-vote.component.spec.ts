import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MajoritaryJudgmentVoteComponent } from './majoritary-judgment-vote.component';

describe('VoteJugementMajoritaireComponent', () => {
  let component: MajoritaryJudgmentVoteComponent;
  let fixture: ComponentFixture<MajoritaryJudgmentVoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MajoritaryJudgmentVoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MajoritaryJudgmentVoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
