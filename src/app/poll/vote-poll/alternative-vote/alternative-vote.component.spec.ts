import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlternativeVoteComponent } from './alternative-vote.component';

describe('VoteAlternatifComponent', () => {
  let component: AlternativeVoteComponent;
  let fixture: ComponentFixture<AlternativeVoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlternativeVoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlternativeVoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
