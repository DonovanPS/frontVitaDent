import { FormsModule } from '@angular/forms';



import { SonNewHistoryFormAnamnesisComponent } from './../son-new-history-form-anamnesis/son-new-history-form-anamnesis.component';
import { Anamnesis } from './../../models/anamnesis';
import { SonNewHistoryExamenPeriodontalComponent } from './../son-new-history-examen-periodontal/son-new-history-examen-periodontal.component';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Paciente } from 'src/app/models/paciente';
import { Subject } from 'rxjs';
import { ExamenPeriodontal } from 'src/app/models/examen-periodontal';
import { Odontologia } from 'src/app/models/odontologia';
import { Tejidos_blandos } from 'src/app/models/tejidos_blandos';
import { Tejidos_dentales } from 'src/app/models/tejidos_dentales';
import { HistoryService } from 'src/app/services/history.service';
import { Route, Router } from '@angular/router';
import { NewHistoryOdontologia } from 'src/app/models/newHistoryOdontologia';
import { NgForm } from '@angular/forms';
import { PacienteService } from 'src/app/services/paciente.service';
import { Acudiente } from 'src/app/models/acudiente';



@Component({
  selector: 'app-new-history',
  templateUrl: './new-history.component.html',
  styleUrls: ['./new-history.component.css'],
  template: `
  Message:
  <app-SonNewHistoryExamenPeriodontalComponent></app-SonNewHistoryExamenPeriodontalComponent>

`,
})
export class NewHistoryComponent implements AfterViewInit {

  paciente = new Paciente()
  message: string;
  acudiente = new Acudiente();


  private examenPeriodontal: ExamenPeriodontal;
  private anamnesis: Anamnesis;
  private odontologia: Odontologia;
  private tejidosBlandos: Tejidos_blandos;
  private tejidosDentales: Tejidos_dentales;

  validarEdadAcu: boolean = false;
  public validDoc: boolean = true;

  modalTitulo: string;
  modalContenid: string;
  edad : number

  reloadPage: boolean = false;

  constructor(
    private historyService: HistoryService,
    //private router: Router,
    private usuarioService: PacienteService


  ) {
    this.anamnesis = new Anamnesis();

  }



  @ViewChild(SonNewHistoryExamenPeriodontalComponent) child: SonNewHistoryExamenPeriodontalComponent;
  eventSubject: Subject<boolean> = new Subject<boolean>();

  ngOnInit(): void{

    this.paciente = new Paciente();
    this.acudiente = new Acudiente();
    this.anamnesis = new Anamnesis();

    this.examenPeriodontal = new ExamenPeriodontal();
    this.odontologia = new Odontologia();
    this.tejidosBlandos = new Tejidos_blandos();
    this.tejidosDentales = new Tejidos_dentales();




    const myButton = document.getElementById("buttonModal") as HTMLButtonElement;

    myButton.style.display = 'none';
  }




  validarNumeroDocumento(id: any) {

    this.usuarioService.validar(id).subscribe((res: any) => {



      const { numUser } = res;


      this.validDoc = numUser == 0

      //res.numUser

    })
  }

  validarEdadAcudiente(fecha: string) {
    const fechaNac = new Date(fecha);
    const fechaActual = new Date();
    const edadEnMilisegundos = fechaActual.getTime() - fechaNac.getTime();
    const edadEnAnios = edadEnMilisegundos / 31536000000; // cantidad de milisegundos en un año
    this.edad = Math.floor(edadEnAnios);

   // console.log(Math.floor(edadEnAnios));
    //console.log(this.edad);




    // Verificar si la edad es mayor o igual a 18
    if (this.edad >= 18) {
      this.validarEdadAcu = true;
    } else {
      this.validarEdadAcu = false;
    }
  }

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    if (event.value != null) {
      const fecha: string = event.value.toISOString().substring(0, 10);
      this.acudiente.fechaNacimiento = fecha;

      this.validarEdadAcudiente(fecha);
    }
  }



  ngAfterViewInit() {
    this.message = this.child.message
  }


  prueba() {

    if (this.validarEdadAcu) {


      // this.paciente.fechaNacimiento= (this.paciente.fechaNacimiento)
      //console.log(this.paciente);
      this.eventSubject.next(true);
      //alert(this.message);

      //console.log(this.paciente.fechaNacimiento);

      this.acudiente.id = this.paciente.id;

      this.examenPeriodontal.examenPeriodontal_id = this.paciente.id;
      this.anamnesis.anamnesis_id = this.paciente.id;
      this.odontologia.odontologia_id = this.paciente.id;
      this.tejidosBlandos.tejidos_blandos_id = this.paciente.id;
      this.tejidosDentales.tejidos_dentales_id = this.paciente.id;

      this.examenPeriodontal.odontologia_id = this.paciente.id;
      this.anamnesis.odontologia_id = this.paciente.id;
      this.odontologia.paciente_id = this.paciente.id;
      this.tejidosBlandos.odontologia_id = this.paciente.id;
      this.tejidosDentales.odontologia_id = this.paciente.id;


      /*
      console.log(this.examenPeriodontal);
      console.log(this.anamnesis);
      console.log(this.odontologia);
      console.log(this.tejidosBlandos);
      console.log(this.tejidosDentales);

      this.newHistoryOdontologia = {};
      this.newHistoryOdontologia.paciente= this.paciente;
      this.newHistoryOdontologia.odontologia= this.odontologia;
      this.newHistoryOdontologia.anamnesis= this.anamnesis;
      this.newHistoryOdontologia.examenPeriodontal= this.examenPeriodontal;
      this.newHistoryOdontologia.tejidosBlandos= this.tejidosBlandos;
      this.newHistoryOdontologia.tejidosDentales= this.tejidosDentales;
        */

      const newHistoryOdontologia = new NewHistoryOdontologia();
      newHistoryOdontologia.paciente = this.paciente;
      newHistoryOdontologia.acudiente = this.acudiente;
      newHistoryOdontologia.odontologia = this.odontologia;
      newHistoryOdontologia.anamnesis = this.anamnesis;
      newHistoryOdontologia.examenPeriodontal = this.examenPeriodontal;
      newHistoryOdontologia.tejidosBlandos = this.tejidosBlandos;
      newHistoryOdontologia.tejidosDentales = this.tejidosDentales;




      this.historyService.createHistory(newHistoryOdontologia).subscribe((res: any) => {


        if(res.message === "insercion correcta"){

          this.modalTitulo = "Registro exitoso";
          this.modalContenid = "La historia clinica del paciente: "+ this.paciente.nombre + " " +this.paciente.apellido + " se a registrado con exito!"

          this.reloadPage = true;
        }else{

          this.modalTitulo = "Error creación Historial";
          this.modalContenid = res.message

          this.reloadPage = false;



        }

        const myButton = document.getElementById("buttonModal") as HTMLButtonElement;
        myButton.click();

      })


    } else {

      this.modalTitulo = "Error Acudiente"
      this.modalContenid = "El acudiente debe ser mayor de edad, la edad calculada es de: "+ this.edad

      const myButton = document.getElementById("buttonModal") as HTMLButtonElement;
      myButton.click();

    }


  }

  /*
    onSubmit(form: NgForm) {
      if (form.invalid) {
        const firstInvalidControl: HTMLElement | null = document.querySelector('.ng-invalid');

        if (firstInvalidControl !== null) {
          firstInvalidControl.scrollIntoView({ behavior: 'smooth' });
          firstInvalidControl.focus();
        }
      }


      // Resto de la lógica
    }
    */



  pruebaEvento(event: ExamenPeriodontal) {
    this.examenPeriodontal = event;
  }

  anamnesisEvento(event: Anamnesis) {
    this.anamnesis = event;
  }

  odontologiaEvento(event: Odontologia) {
    this.odontologia = event;
  }
  tejidosBlandosEvento(event: Tejidos_blandos) {
    this.tejidosBlandos = event;
  }

  tejidosDentalesEvento(event: Tejidos_dentales) {
    this.tejidosDentales = event;
  }


  reload(){
    if(this.reloadPage){
      location.reload();
    }
  }

}
