import { Subject, Subscription } from 'rxjs';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ExamenPeriodontal } from 'src/app/models/examen-periodontal';

@Component({
  selector: 'app-son-new-history-examen-periodontal',
  templateUrl: './son-new-history-examen-periodontal.component.html',
  styleUrls: ['./son-new-history-examen-periodontal.component.css']
})
export class SonNewHistoryExamenPeriodontalComponent implements OnInit, OnDestroy {
  examenperiodontal = new ExamenPeriodontal()
  message: string = "Hola Mundo!"

  @Input() eventSubject: Subject<boolean>;
  @Output() examenEvent : EventEmitter<ExamenPeriodontal> = new EventEmitter<ExamenPeriodontal>();
  subscription: Subscription;


  ngOnInit(): void {
    if(this.eventSubject){
      this.subscription = this.eventSubject.asObservable().subscribe(
        res => this.prueba()
      )
    }
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  prueba(){
    this.examenEvent.emit(this.examenperiodontal);
  }

}

