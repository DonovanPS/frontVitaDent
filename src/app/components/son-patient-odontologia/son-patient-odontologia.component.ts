

import { Tejidos_dentales } from './../../models/tejidos_dentales';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Anamnesis } from 'src/app/models/anamnesis';
import { ExamenPeriodontal } from 'src/app/models/examen-periodontal';
import { Odontologia } from 'src/app/models/odontologia';
import { Tejidos_blandos } from 'src/app/models/tejidos_blandos';
import { HistoryService } from 'src/app/services/history.service';
import { PacienteService } from 'src/app/services/paciente.service';

import { ToastrService } from 'ngx-toastr';

import { NewHistoryOdontologia } from 'src/app/models/newHistoryOdontologia';

import { Paciente } from 'src/app/models/paciente';
import { Acudiente } from 'src/app/models/acudiente';


@Component({
  selector: 'app-son-patient-odontologia',
  templateUrl: './son-patient-odontologia.component.html',
  styleUrls: ['./son-patient-odontologia.component.css']
})




export class SonPatientOdontologiaComponent implements OnInit, OnDestroy {

  @Output() idPaciente = new EventEmitter<string>();


  @Output() informacionPaciente = new EventEmitter<{ nombres: string, tipoDocumento: string, numeroDocumento: string }>();

  @Input() eventSubject: Subject<boolean>;
  subscription: Subscription;

  showbutton: boolean = true;
  public validDoc: boolean = true;

  paciente = new Paciente()


  id: number;

  edad: string;

  auxId: number;

  edadAcudiente: string;




  public odontologia: Odontologia;
  public anamnesis: Anamnesis;

  public tejidos_blandos: Tejidos_blandos;
  public tejidos_dentales: Tejidos_dentales;
  public examen_periodontal: ExamenPeriodontal;

  public Paciente: Paciente;
  public acudiente: Acudiente;






  constructor(
    private pacienteService: PacienteService,
    private historyService: HistoryService,
    private toastr: ToastrService

  ) {




    this.odontologia = new Odontologia();
    this.examen_periodontal = new ExamenPeriodontal();
    this.anamnesis = new Anamnesis();
    this.tejidos_blandos = new Tejidos_blandos();
    this.tejidos_dentales = new Tejidos_dentales();
    this.examen_periodontal = new ExamenPeriodontal();
    this.acudiente = new Acudiente();

  }


  ngOnInit(): void {

    const myButton = document.getElementById("myButton") as HTMLButtonElement;

    myButton.style.display = 'none';

    const id: any = localStorage.getItem('paciente');
    this.id = id;
    this.auxId = id;
    //localStorage.removeItem('paciente');




    this.pacienteService.getPaciente(id).subscribe((res: any) => {

      const Res_paciente = res.data[0]; // Obtener el objeto con los datos del paciente


      this.paciente.id = Res_paciente.paciente_id;
      this.paciente.tipoID = Res_paciente.tipo_documento;
      this.paciente.nombre = Res_paciente.nombre;
      this.paciente.apellido = Res_paciente.apellido;
      this.paciente.fechaNacimiento = Res_paciente.fecha_nacimiento;
      this.paciente.fechaNacimiento = this.paciente.fechaNacimiento.split('T')[0];
      this.paciente.genero = Res_paciente.sexo;
      this.paciente.estadoCivil = Res_paciente.estado_civil;
      this.paciente.ciudadNacimiento = Res_paciente.ciudad_nacimiento;
      this.paciente.ocupacion = Res_paciente.ocupacion;
      this.paciente.servicioSalud = Res_paciente.servicio_salud;
      this.paciente.ciudadResidencia = Res_paciente.ciudad_residencia;
      this.paciente.direccion = Res_paciente.direccion;
      this.paciente.celular = Res_paciente.numero_celular;



      this.edad = this.calcularEdad(Res_paciente.fecha_nacimiento).toString();


      this.idPaciente.emit(this.paciente.id.toString());

      this.informacionPaciente.emit({ nombres: this.paciente.nombre + " " + this.paciente.apellido, tipoDocumento: this.paciente.tipoID, numeroDocumento: this.paciente.id.toString() });





    });

    this.consultaAcudiente();
    this.consultarOdontologial();
    this.consultaAnamnesis();
    this.consultaTejidosBlandos();
    this.consultaTejidosDentales();
    this.consultaTejidosPeriodontales();

    if (this.eventSubject) {
      this.subscription = this.eventSubject.asObservable().subscribe(
        res => this.editar()
      )
    }

  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  consultaAcudiente() {
    this.historyService.getHistory(this.id, 'acudientes', 'paciente_id').subscribe((res: any) => {

      this.acudiente.id = res.data[0].paciente_id;
      this.acudiente.nombre = res.data[0].nombre;
      this.acudiente.apellido = res.data[0].apellido;
      this.acudiente.parentesco = res.data[0].parentesco;
      this.acudiente.fechaNacimiento = res.data[0].fecha_nacimiento;
      this.acudiente.telefono = res.data[0].numero_celular;

      this.edadAcudiente = this.calcularEdad(this.acudiente.fechaNacimiento).toString();

    });
  }


  consultarOdontologial() {
    this.historyService.getHistory(this.id, 'historiales_odontologia', 'odontologia_id').subscribe((res: any) => {


      this.odontologia.odontologia_id = res.data[0].odontologia_id;

      this.odontologia.higiene_oral = res.data[0].higiene_oral;

      this.odontologia.cepillado = res.data[0].cepillado;
      this.odontologia.numero_cepillado = res.data[0].numero_cepillado;
      this.odontologia.enjuague_bucal = res.data[0].enjuague_bucal;
      this.odontologia.seda_dental = res.data[0].seda_dental;
      this.odontologia.plan_tratamiento = res.data[0].plan_tratamiento;
      this.odontologia.paciente_id = res.data[0].paciente_id;


    });
  }


  consultaAnamnesis() {
    this.historyService.getHistory(this.id, 'anamnesis', 'anamnesis_id').subscribe((res: any) => {


      this.anamnesis.anamnesis_id = res.data[0].anamnesis_id
      this.anamnesis.hipertencion = res.data[0].hipertension === '1' ? true : false;
      this.anamnesis.enfe_respiratorias = res.data[0].enfermedades_respiratorias === '1' ? true : false;
      this.anamnesis.cardiopatias = res.data[0].cardiopatias === '1' ? true : false;
      this.anamnesis.sistema_digestivo = res.data[0].sistema_digestivo === '1' ? true : false;
      this.anamnesis.fiebre_reumatica = res.data[0].fiebre_reumatica === '1' ? true : false;
      this.anamnesis.hepatitis = res.data[0].hepatitis === '1' ? true : false;
      this.anamnesis.enfer_renales = res.data[0].enfermedades_renales === '1' ? true : false;
      this.anamnesis.enfer_gastrointestinales = res.data[0].enfermedades_gastrointestinales === '1' ? true : false;
      this.anamnesis.quirurgico = res.data[0].quirurgico === '1' ? true : false;
      this.anamnesis.traumatico = res.data[0].traumatico === '1' ? true : false;
      this.anamnesis.tratamiento_medico = res.data[0].tratamiento_medico === '1' ? true : false;
      this.anamnesis.toma_medicamento = res.data[0].toma_medicamentos === '1' ? true : false;
      this.anamnesis.alergia = res.data[0].alergias === '1' ? true : false;
      this.anamnesis.embarazo = res.data[0].embarazo === '1' ? true : false;
      this.anamnesis.diabetes = res.data[0].diabetes === '1' ? true : false;
      this.anamnesis.neoplasias = res.data[0].neoplasias === '1' ? true : false;
      this.anamnesis.enfer_hemorrogicas = res.data[0].enfermedad_hemorrogica === '1' ? true : false;
      this.anamnesis.nf_neurologicas = res.data[0].nf_neurologicas === '1' ? true : false;
      this.anamnesis.grupo_sangineo = res.data[0].grupo_sanguineo
      this.anamnesis.rh = res.data[0].rh
      this.anamnesis.observaciones = res.data[0].observaciones






    });

  }

  consultaTejidosBlandos() {
    this.historyService.getHistory(this.id, 'examenes_tejidos_blandos', 'tejidos_blandos_id').subscribe((res: any) => {

      this.tejidos_blandos.tejidos_blandos_id = res.data[0].tejidos_blandos_id;
      this.tejidos_blandos.labios = res.data[0].labios === '1' ? true : false;
      this.tejidos_blandos.lengua = res.data[0].lengua === '1' ? true : false;
      this.tejidos_blandos.carrillos = res.data[0].carrillos === '1' ? true : false;
      this.tejidos_blandos.frenillos = res.data[0].frenillos === '1' ? true : false;
      this.tejidos_blandos.encias = res.data[0].encias === '1' ? true : false;
      this.tejidos_blandos.paladar = res.data[0].paladar === '1' ? true : false;
      this.tejidos_blandos.lengua = res.data[0].lengua === '1' ? true : false;
      this.tejidos_blandos.orofaringe = res.data[0].orofaringe === '1' ? true : false;
      this.tejidos_blandos.glandulas = res.data[0].glandulas === '1' ? true : false;
      this.tejidos_blandos.piso_boca = res.data[0].piso_boca === '1' ? true : false;
      this.tejidos_blandos.musculos_masticatorios = res.data[0].musculos_masticatorios === '1' ? true : false;
      this.tejidos_blandos.otros = res.data[0].otros;
      this.tejidos_blandos.odontologia_id = res.data[0].odontologia_id;

    });
  }

  consultaTejidosDentales() {
    this.historyService.getHistory(this.id, 'examenes_tejidos_dentales', 'tejidos_dentales_id').subscribe((res: any) => {

      this.tejidos_dentales.tejidos_dentales_id = res.data[0].tejidos_dentales_id;
      this.tejidos_dentales.supernumerarios = res.data[0].supernumerarios === '1' ? true : false;
      this.tejidos_dentales.abrasion = res.data[0].abrasion === '1' ? true : false;
      this.tejidos_dentales.incluidos = res.data[0].incluidos === '1' ? true : false;
      this.tejidos_dentales.maloclusiones = res.data[0].maloclusiones === '1' ? true : false;
      this.tejidos_dentales.cambio_color = res.data[0].cambio_color === '1' ? true : false;
      this.tejidos_dentales.trauma = res.data[0].trauma === '1' ? true : false;
      this.tejidos_dentales.patologia_pulmonar = res.data[0].patologia_pulpar === '1' ? true : false;
      this.tejidos_dentales.otros = res.data[0].otros;


    });
  }

  consultaTejidosPeriodontales() {

    this.historyService.getHistory(this.id, 'examen_periodontal', 'periodontal_id').subscribe((res: any) => {


      this.examen_periodontal.examenPeriodontal_id = res.data[0].examenPeriodontal_id;
      this.examen_periodontal.bolsas = res.data[0].bolsas;
      this.examen_periodontal.movilidad = res.data[0].movilidad;
      this.examen_periodontal.placaBlanca = res.data[0].placa_blanda;
      this.examen_periodontal.calculos = res.data[0].calculos;
      this.examen_periodontal.observaciones = res.data[0].observaciones;




    });
  }


  calcularEdad(fechaNacimiento: string): number {
    const fechaNac = new Date(fechaNacimiento);
    const fechaActual = new Date();
    const edadEnMilisegundos = fechaActual.getTime() - fechaNac.getTime();
    const edadEnAnios = edadEnMilisegundos / 31536000000; // cantidad de milisegundos en un año
    return Math.floor(edadEnAnios);
  }


  editar() {

    const myButton = document.getElementById("myButton") as HTMLButtonElement;
    myButton.click();

  }


  validarNumeroDocumento(id: any) {

    this.pacienteService.validar(id).subscribe((res: any) => {

      const { numUser } = res;


      this.validDoc = numUser == 0

      //res.numUser

    })
  }



  actualizarDatos() {
    this.acudiente.id = this.paciente.id;

    this.examen_periodontal.examenPeriodontal_id = this.paciente.id;
    this.anamnesis.anamnesis_id = this.paciente.id;
    this.odontologia.odontologia_id = this.paciente.id;
    this.tejidos_blandos.tejidos_blandos_id = this.paciente.id;
    this.tejidos_dentales.tejidos_dentales_id = this.paciente.id;

    this.examen_periodontal.odontologia_id = this.paciente.id;
    this.anamnesis.odontologia_id = this.paciente.id;
    this.odontologia.paciente_id = this.paciente.id;
    this.tejidos_blandos.odontologia_id = this.paciente.id;
    this.tejidos_dentales.odontologia_id = this.paciente.id;

    const newHistoryOdontologia = new NewHistoryOdontologia();
    newHistoryOdontologia.paciente = this.paciente;
    newHistoryOdontologia.acudiente = this.acudiente;
    newHistoryOdontologia.odontologia = this.odontologia;
    newHistoryOdontologia.anamnesis = this.anamnesis;
    newHistoryOdontologia.examenPeriodontal = this.examen_periodontal;
    newHistoryOdontologia.tejidosBlandos = this.tejidos_blandos;
    newHistoryOdontologia.tejidosDentales = this.tejidos_dentales;

    this.historyService.updateHistory(newHistoryOdontologia, this.auxId).subscribe((res: any) => {

      if (res.message === 'actualizado') {
        this.toastr.success('Datos actualizados correctamente', 'OK', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
          progressBar: true,
          progressAnimation: 'increasing',
          closeButton: false,
        });

        localStorage.setItem('paciente', this.paciente.id.toString());
      } else {
        this.toastr.error(res.message, 'Error al actualizar', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
          progressBar: true,
          progressAnimation: 'increasing',
          closeButton: false,
        });

      }


    })

  }







}
