import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SonPatientOrtodonciaComponent } from './son-patient-ortodoncia.component';

describe('SonPatientOrtodonciaComponent', () => {
  let component: SonPatientOrtodonciaComponent;
  let fixture: ComponentFixture<SonPatientOrtodonciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SonPatientOrtodonciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SonPatientOrtodonciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
