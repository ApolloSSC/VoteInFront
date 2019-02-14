import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropositionModalComponent } from './proposition-modal.component';

describe('PropositionModalComponent', () => {
  let component: PropositionModalComponent;
  let fixture: ComponentFixture<PropositionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropositionModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropositionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
