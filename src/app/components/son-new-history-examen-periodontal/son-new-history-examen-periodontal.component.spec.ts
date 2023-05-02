import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SonNewHistoryExamenPeriodontalComponent } from './son-new-history-examen-periodontal.component';

describe('SonNewHistoryExamenPeriodontalComponent', () => {
  let component: SonNewHistoryExamenPeriodontalComponent;
  let fixture: ComponentFixture<SonNewHistoryExamenPeriodontalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SonNewHistoryExamenPeriodontalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SonNewHistoryExamenPeriodontalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
