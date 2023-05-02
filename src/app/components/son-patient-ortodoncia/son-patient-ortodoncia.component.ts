import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject, Subscription } from 'rxjs';
import { Acudiente } from 'src/app/models/acudiente';
import { Anamnesis } from 'src/app/models/anamnesis';
import { Ortodoncia } from 'src/app/models/ortodoncia';
import { Paciente } from 'src/app/models/paciente';
import { HistoryService } from 'src/app/services/history.service';
import { PacienteService } from 'src/app/services/paciente.service';

@Component({
  selector: 'app-son-patient-ortodoncia',
  templateUrl: './son-patient-ortodoncia.component.html',
  styleUrls: ['./son-patient-ortodoncia.component.css']
})
export class SonPatientOrtodonciaComponent {


  @Output() idPaciente = new EventEmitter<string>();

  @Input() eventSubject: Subject<boolean>;
  subscription: Subscription;

  public validDoc: boolean = true;

  paciente = new Paciente()

  id: number;
  edadAcudiente: string;

  edad: string;



  public acudiente: Acudiente;
  public anamnesis: Anamnesis;
  public Paciente: Paciente;
  public ortodoncia: Ortodoncia;



  @Output() informacionPaciente = new EventEmitter<{ nombres: string, tipoDocumento: string, numeroDocumento: string }>();

  constructor(private pacienteService: PacienteService,
    private historyService: HistoryService,
    private toastr: ToastrService
    ) {
    this.acudiente = new Acudiente();
    this.anamnesis = new Anamnesis();
    this.ortodoncia = new Ortodoncia();
    this.paciente = new Paciente();

  }


  ngOnInit(): void {

    const myButton = document.getElementById("myButton") as HTMLButtonElement;

    myButton.style.display = 'none';

    const id: any = localStorage.getItem('paciente');
    this.id = id;
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
    this.consultaAnamnesis();
    this.consultaOrtodoncia();

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

  consultaOrtodoncia() {
    this.historyService.getHistory(this.id, 'historiales_ortodoncia', 'ortodoncia_id').subscribe((res: any) => {

      this.ortodoncia = res.data[0];


      /*
      this.ortodoncia.ortodoncia_id = res.data[0].ortodoncia_id;
      this.ortodoncia.linea_media = res.data[0].linea_media;
      this.ortodoncia.overjet = res.data[0].overjet;
      this.ortodoncia.overbite = res.data[0].overbite;
      this.ortodoncia.perdida_dientes = res.data[0].perdida_dientes;
      this.ortodoncia.migraciones = res.data[0].migraciones;
      this.ortodoncia.asimentria_facial = res.data[0].asimentria_facial;
      this.ortodoncia.apinamiento_superior = res.data[0].apinamiento_superior;
      this.ortodoncia.apinamiento_inferior = res.data[0].apinamiento_inferior;
      this.ortodoncia.perfil = res.data[0].perfil;
      this.ortodoncia.habitos = res.data[0].habitos;
      this.ortodoncia.relacion_canina_derecha = res.data[0].relacion_canina_derecha;
      this.ortodoncia.relacion_canina_izquierda = res.data[0].relacion_canina_izquierda;
      this.ortodoncia.relacion_molar_derecha = res.data[0].relacion_molar_derecha;
      this.ortodoncia.relacion_molar_izquierda = res.data[0].relacion_molar_izquierda;
      this.ortodoncia.mal_posicion_dental_superior = res.data[0].mal_posicion_dental_superior;
      this.ortodoncia.mal_posicion_dental_inferior = res.data[0].mal_posicion_dental_inferior;
      this.ortodoncia.mordida_cruzada = res.data[0].mordida_cruzada;
      this.ortodoncia.otros = res.data[0].otros;
      this.ortodoncia.pronostico = res.data[0].pronostico;
      this.ortodoncia.plan_de_tratamiento = res.data[0].plan_de_tratamiento;
      this.ortodoncia.paciente_id = res.data[0].paciente_id;
      this.ortodoncia.anamnesis_id = res.data[0].anamnesis_id;

*/


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


  actualizar() {

    this.acudiente.id = this.paciente.id;
    this.anamnesis.anamnesis_id = this.paciente.id;
    this.ortodoncia.ortodoncia_id = this.paciente.id;

    let datosOrtodonciaActualizar: (Paciente | Acudiente | Anamnesis | Ortodoncia)[] = [];
    datosOrtodonciaActualizar.push(this.paciente, this.acudiente, this.anamnesis, this.ortodoncia);





    this.historyService.updateHistoryOrtodoncia(datosOrtodonciaActualizar, this.id).subscribe((res: any) => {

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
    });


  }


}
