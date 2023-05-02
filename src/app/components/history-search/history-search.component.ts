import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';


import { HistoryService } from 'src/app/services/history.service';
import { PacienteService } from 'src/app/services/paciente.service';
import { SonHistorySearchComponent } from 'src/app/components/son-history-search/son-history-search.component'
import { ToastrService, IndividualConfig } from 'ngx-toastr';
import { ToastrIconClasses } from 'ngx-toastr';



@Component({
  selector: 'app-history-search',
  templateUrl: './history-search.component.html',
  styleUrls: ['./history-search.component.css']
})
export class HistorySearchComponent implements AfterViewInit {
  viewContainerRef: any;
  componentFactoryResolver: any;

  constructor(
    private historyService: HistoryService,
    private usuarioService: PacienteService,
    private toastr: ToastrService

  ) {
  }


  ngAfterViewInit(): void {

    if(localStorage.getItem("eliminar")==="true"){
      this.showToast();
    }


  }


  @ViewChild('buscar') buscar: ElementRef;
  id: '';

  dataPacienteOdontologia: { idP: '', nombrePaciente: string, historial: string };

  dataPacienteOrtodoncia: { idP: '', nombrePaciente: string, historial: string };

  showSonHistorySearchOdontologia = false;
  showSonHistorySearchOrtodoncia = false;


  public validDoc: boolean = true;

  validarNumeroDocumento(id: any) {

    if (id !== '') {

      this.usuarioService.validar(id).subscribe((res: any) => {




        const { numUser } = res;

        this.validDoc = numUser == 0



        if (this.validDoc || id === '') this.buscar.nativeElement.disabled = true;
        if (!this.validDoc) this.buscar.nativeElement.disabled = false;

      })

    }


  }


  consultarHistorias() {

    //this.agregarComponente();

    this.showSonHistorySearchOdontologia = false;
    this.showSonHistorySearchOrtodoncia = false;

    this.historyService.findHistory(this.id).subscribe((res: any) => {




      if (res.numOdontologia == 1) {


        this.dataPacienteOdontologia = {
          nombrePaciente: res.nombrePaciente,
          historial: "1. Historial Odontológico",
          idP: this.id
        };


        this.toggleSonHistorySearchOdontologia();
      }


      if (res.numOrtodoncia == 1) {

        this.dataPacienteOrtodoncia = {
          nombrePaciente: res.nombrePaciente,
          historial: "2. Historial Ortodoncia",
          idP: this.id
        };



        this.toggleSonHistorySearchOrtodoncia();
      }



    })
  }

  toggleSonHistorySearchOdontologia() {
    this.showSonHistorySearchOdontologia = true
  }

  toggleSonHistorySearchOrtodoncia() {
    this.showSonHistorySearchOrtodoncia = true;
  }



  contador = 0;
  agregarComponente() {
    this.contador++;

    // Se crea una instancia del componente NuevoComponente y se agrega al contenedor
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(SonHistorySearchComponent);
    const componentRef = this.viewContainerRef.createComponent(componentFactory);
    this.viewContainerRef.insert(componentRef.hostView);
  }

  showToast() {
    this.toastr.success('Usuario eliminado!', 'Alerta', {
      timeOut: 3000,
      extendedTimeOut: 2000,
      progressBar: true,
      progressAnimation: 'increasing',
      closeButton: false,
    });

    localStorage.removeItem("eliminar");

  }

}
