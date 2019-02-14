import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultVoteAlternatifComponent } from './result-vote-alternatif.component';

describe('ResultVoteAlternatifComponent', () => {
  let component: ResultVoteAlternatifComponent;
  let fixture: ComponentFixture<ResultVoteAlternatifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultVoteAlternatifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultVoteAlternatifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
