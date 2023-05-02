import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SonPatientOdontologiaComponent } from './son-patient-odontologia.component';

describe('SonPatientOdontologiaComponent', () => {
  let component: SonPatientOdontologiaComponent;
  let fixture: ComponentFixture<SonPatientOdontologiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SonPatientOdontologiaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SonPatientOdontologiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
