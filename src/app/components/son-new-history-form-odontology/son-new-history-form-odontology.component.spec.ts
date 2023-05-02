import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SonNewHistoryFormOdontologyComponent } from './son-new-history-form-odontology.component';

describe('SonNewHistoryFormOdontologyComponent', () => {
  let component: SonNewHistoryFormOdontologyComponent;
  let fixture: ComponentFixture<SonNewHistoryFormOdontologyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SonNewHistoryFormOdontologyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SonNewHistoryFormOdontologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
