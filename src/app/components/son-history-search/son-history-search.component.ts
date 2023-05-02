import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-son-history-search',
  templateUrl: './son-history-search.component.html',
  styleUrls: ['./son-history-search.component.css']
})
export class SonHistorySearchComponent implements OnChanges {
  @Input() dataPaciente: any;

  historial: string = '';
  nombrePaciente: string = '';
  id: string = '';

  constructor() {
  }

  ngOnChanges() {

    const { idP, nombrePaciente, historial } = this.dataPaciente;
    this.historial = historial;
    this.nombrePaciente = nombrePaciente;
    this.id = idP;
  }


  verHistorial() {

    localStorage.setItem('paciente',this.id)
    localStorage.setItem('historial',this.historial)
  }


}
