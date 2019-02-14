import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultJugementMajoritaireComponent } from './result-jugement-majoritaire.component';

describe('ResultJugementMajoritaireComponent', () => {
  let component: ResultJugementMajoritaireComponent;
  let fixture: ComponentFixture<ResultJugementMajoritaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultJugementMajoritaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultJugementMajoritaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
