import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Ortodoncia } from 'src/app/models/ortodoncia';
import { HistoryService } from 'src/app/services/history.service';
import { PacienteService } from 'src/app/services/paciente.service';

@Component({
  selector: 'app-new-history-ortodoncia',
  templateUrl: './new-history-ortodoncia.component.html',
  styleUrls: ['./new-history-ortodoncia.component.css']
})
export class NewHistoryOrtodonciaComponent {

  ortodoncia = new Ortodoncia();
  public validDoc: boolean = true;

  pacientes: any[] = [];

  constructor(
    private pacienteService: PacienteService,
    private historyService: HistoryService,
    private toastr: ToastrService,
  ){
    this.ortodoncia = new Ortodoncia();
  }

  ngOnInit(): void {

    this.cargarPacientes();
    this.pacientes = [];
    this.ortodoncia = new Ortodoncia();


  }

  validarNumeroDocumento(id: any) {

    this.pacienteService.validar(id).subscribe((res: any) => {



      const { numUser } = res;


      this.validDoc = numUser == 0

      //res.numUser

    })
  }

  cargarPacientes(){
    this.pacienteService.getPacientes().subscribe((res: any) => {
      this.pacientes = res.data;

    })
  }

  crearNuevaHistorias(){


    this.historyService.crearHistoriaOrtodoncia(this.ortodoncia).subscribe((res: any) => {

      if(res.success){

        this.toastr.success('Nueva historia ortodoncia creada', 'OK', {
          timeOut: 3000,
          positionClass: 'toast-bottom-center',
          progressBar: true,
          progressAnimation: 'increasing',
          closeButton: false,

        });


        this.ngOnInit();


      }else{

        this.toastr.error(res.message, 'Error', {
          timeOut: 3000,
          positionClass: 'toast-bottom-center',
          progressBar: true,
          progressAnimation: 'increasing',
          closeButton: false,
        });

      }


    });
  }

}
