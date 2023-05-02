import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SonNewHistoryExamenTejidosblandosComponent } from './son-new-history-examen-tejidos-blandos.component';

describe('SonNewHistoryExamenTejidosblandosComponent', () => {
  let component: SonNewHistoryExamenTejidosblandosComponent;
  let fixture: ComponentFixture<SonNewHistoryExamenTejidosblandosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SonNewHistoryExamenTejidosblandosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SonNewHistoryExamenTejidosblandosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
