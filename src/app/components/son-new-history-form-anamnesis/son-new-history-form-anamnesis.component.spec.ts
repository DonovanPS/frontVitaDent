import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SonNewHistoryFormAnamnesisComponent } from './son-new-history-form-anamnesis.component';

describe('SonNewHistoryFormAnamnesisComponent', () => {
  let component: SonNewHistoryFormAnamnesisComponent;
  let fixture: ComponentFixture<SonNewHistoryFormAnamnesisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SonNewHistoryFormAnamnesisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SonNewHistoryFormAnamnesisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
