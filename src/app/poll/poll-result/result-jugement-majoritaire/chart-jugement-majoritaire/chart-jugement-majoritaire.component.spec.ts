import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartJugementMajoritaireComponent } from './chart-jugement-majoritaire.component';

describe('ChartJugementMajoritaireComponent', () => {
  let component: ChartJugementMajoritaireComponent;
  let fixture: ComponentFixture<ChartJugementMajoritaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartJugementMajoritaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartJugementMajoritaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
