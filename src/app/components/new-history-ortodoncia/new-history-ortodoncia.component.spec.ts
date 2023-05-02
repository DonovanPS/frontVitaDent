import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewHistoryOrtodonciaComponent } from './new-history-ortodoncia.component';

describe('NewHistoryOrtodonciaComponent', () => {
  let component: NewHistoryOrtodonciaComponent;
  let fixture: ComponentFixture<NewHistoryOrtodonciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewHistoryOrtodonciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewHistoryOrtodonciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
