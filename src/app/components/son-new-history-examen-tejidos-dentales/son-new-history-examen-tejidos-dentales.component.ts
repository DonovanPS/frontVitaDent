import { Component, Input, Output, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { Tejidos_dentales } from 'src/app/models/tejidos_dentales';
import { Subject, Subscription } from 'rxjs';


@Component({
  selector: 'app-son-new-history-examen-tejidos-dentales',
  templateUrl: './son-new-history-examen-tejidos-dentales.component.html',
  styleUrls: ['./son-new-history-examen-tejidos-dentales.component.css']
})
export class SonNewHistoryExamenTejidosDentalesComponent implements OnInit, OnDestroy {

  tejidosdentales = new Tejidos_dentales;

  @Input() eventSubject: Subject<boolean>; 
  @Output() tejidosDentalesEvent: EventEmitter<Tejidos_dentales> = new EventEmitter<Tejidos_dentales>   

  subscription: Subscription;

  ngOnInit(): void {
    if(this.eventSubject){
      this.subscription = this.eventSubject.asObservable().subscribe(
        res => this.sendData()
      )
    }
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();

    }
    
  }

  sendData(){
    this.tejidosDentalesEvent.emit(this.tejidosdentales)
  }

}
