import { Component, OnInit , OnDestroy , Input, Output, EventEmitter} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Tejidos_blandos } from 'src/app/models/tejidos_blandos';

@Component({
  selector: 'app-son-new-history-examen-tejidos-blandos',
  templateUrl: './son-new-history-examen-tejidos-blandos.component.html',
  styleUrls: ['./son-new-history-examen-tejidos-blandos.component.css']
})
export class SonNewHistoryExamenTejidosblandosComponent {

  tejidos_blandos = new Tejidos_blandos

  @Input() eventSubject: Subject<boolean> 
  @Output() tejidosblandosEvent : EventEmitter<Tejidos_blandos> = new EventEmitter<Tejidos_blandos>();  
  subscription: Subscription;

  ngOnInit(): void{
    if(this.eventSubject){
      this.subscription = this.eventSubject.asObservable().subscribe(
        res => this.sendData()
      )
    }
  }

  ngOnDestroy(): void{
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  sendData(){
    this.tejidosblandosEvent.emit(this.tejidos_blandos)
  }



}
