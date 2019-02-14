import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultScrutinMajoritaireComponent } from './result-scrutin-majoritaire.component';

describe('ResultScrutinMajoritaireComponent', () => {
  let component: ResultScrutinMajoritaireComponent;
  let fixture: ComponentFixture<ResultScrutinMajoritaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultScrutinMajoritaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultScrutinMajoritaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
