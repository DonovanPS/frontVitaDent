import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SonHistorySearchComponent } from './son-history-search.component';

describe('SonHistorySearchComponent', () => {
  let component: SonHistorySearchComponent;
  let fixture: ComponentFixture<SonHistorySearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SonHistorySearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SonHistorySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
