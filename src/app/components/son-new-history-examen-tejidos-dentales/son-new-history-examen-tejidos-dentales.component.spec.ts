import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SonNewHistoryExamenTejidosDentalesComponent } from './son-new-history-examen-tejidos-dentales.component';

describe('SonNewHistoryExamenTejidosDentalesComponent', () => {
  let component: SonNewHistoryExamenTejidosDentalesComponent;
  let fixture: ComponentFixture<SonNewHistoryExamenTejidosDentalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SonNewHistoryExamenTejidosDentalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SonNewHistoryExamenTejidosDentalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
