import { Component, EventEmitter, OnDestroy, OnInit, Input,Output } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Odontologia } from 'src/app/models/odontologia';

@Component({
  selector: 'app-son-new-history-form-odontology',
  templateUrl: './son-new-history-form-odontology.component.html',
  styleUrls: ['./son-new-history-form-odontology.component.css']
})
export class SonNewHistoryFormOdontologyComponent implements OnInit, OnDestroy {

  


  odontologia = new Odontologia;

  @Input() eventSubject: Subject<boolean>;
  @Output() odontologiaEvent: EventEmitter<Odontologia> = new EventEmitter<Odontologia>
  subscription: Subscription;

  ngOnInit(): void{
    if(this.eventSubject){
      this.subscription = this.eventSubject.asObservable().subscribe(
        res => this.sendData()
      )
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  sendData(){
    this.odontologiaEvent.emit(this.odontologia)
  }

}
