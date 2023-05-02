import { Anamnesis } from './../../models/anamnesis';
import { Subject, Subscription } from 'rxjs';

import { Component,Input, Output, OnInit, OnDestroy, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-son-new-history-form-anamnesis',
  templateUrl: './son-new-history-form-anamnesis.component.html',
  styleUrls: ['./son-new-history-form-anamnesis.component.css']
})
export class SonNewHistoryFormAnamnesisComponent implements OnInit, OnDestroy {


  anamnesis = new Anamnesis()



  @Input() eventSubject: Subject<boolean>;
  @Output() anamnesisEvent : EventEmitter<Anamnesis> = new EventEmitter<Anamnesis>();
  subscription: Subscription;


  ngOnInit(): void{
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
    this.anamnesisEvent.emit(this.anamnesis)
  }
}
