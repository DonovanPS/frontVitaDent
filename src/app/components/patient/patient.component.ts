
import { Component, OnInit } from '@angular/core';

import { Subject } from 'rxjs';
import ImageService from 'src/app/services/image.service';
import { PacienteService } from 'src/app/services/paciente.service';
import { RecordService } from 'src/app/services/record.service';
import { environment } from 'src/environment/environment';

import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})




export class PatientComponent {


  tipoDocumento: number;
  history: string;
  records: any[] = [];
  showDivRadiografias: boolean = false;
  showDivTable: boolean = false;


  images: any[] = [];
  public URL = environment.apiUrl;


  showSonPatientOdontologia = false;
  showSonPatientOrtodoncia = false

  nombres: string;
  tipoDoc: string;
  numeroDocumento: string;

  idAux: number;


  imageForm: FormGroup;

  RegistroForm: FormGroup;
  selectedFile: File;
  imageUrl: string;

  tipoRegistro: string;


  verImagen: any = {
    descripcion: "Son muy lindas",
    historia: "Odontológico",
    paciente_id: 1002457248,
    radiografia_id: 4,
    ruta: "tv_show-the_owl_house-amity_blight-eda_clawthorne-king_clawthorne-luz_noceda-1043189.jpeg",
    titulo: "Lumity"
  };

  constructor(
    private recordService: RecordService,
    private pacienteService: PacienteService,
    private imageService: ImageService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,


  ) {

    this.imageForm = this.formBuilder.group({
      file: [''],
      description: [''],
      title: ['']
    });

    this.RegistroForm = this.formBuilder.group({
      fecha: [''],
      id: [''],
      consulta: [''],
      descripcion: [''],
      procedimiento: [''],
      precio: ['']
    });

  }

  eventSubject: Subject<boolean> = new Subject<boolean>();
  eventSubjectAgregarImagen: Subject<boolean> = new Subject<boolean>(); // bolena para agregar imagen



  ngOnInit(): void {

    const id = localStorage.getItem('paciente');

    this.id = id !== null ? id : '';

    const myButton2 = document.getElementById("myButton2") as HTMLButtonElement;
    myButton2.style.display = 'none';

    const verImagenes = document.getElementById("modalVerImagenes") as HTMLButtonElement;
    verImagenes.style.display = 'none';



    // estrae la variable del local Storage y la compara con el valor de la variable
    const history = localStorage.getItem('historial');

    this.history = history !== null ? history : '';



    if (history === '1. Historial Odontológico') {
      this.toggleSonPatientOdontologia()
      this.history = 'historial odontológico'
      this.tipoRegistro = 'Odontología'

    } else if (history === '2. Historial Ortodoncia') {
      this.toggleSonPatientOrtodoncia()
      this.history = 'historial ortodoncia'
      this.tipoRegistro = 'Ortodoncia'
    }

    this.cargarRadiografias();



  }

  recibirInformacionPaciente(informacion: { nombres: string, tipoDocumento: string, numeroDocumento: string }) {

    this.nombres = informacion.nombres;
    this.tipoDoc = informacion.tipoDocumento;
    this.numeroDocumento = informacion.numeroDocumento;
    this.idAux = parseInt(this.numeroDocumento);

  }



  idPacienteEvento(event: string) {
    this.tipoDocumento = parseInt(event);

    if (this.history === 'historial odontológico') {
      this.consultaOdontologia();
      this.toggleSonPatientOdontologia();
    } else if (this.history === 'historial ortodoncia') {
      this.toggleSonPatientOrtodoncia()
      this.consultaOrtodoncia();
    }


  }

  toggleSonPatientOdontologia() {
    this.showSonPatientOdontologia = true

  }

  toggleSonPatientOrtodoncia() {
    this.showSonPatientOrtodoncia = true
  }

  consultaOdontologia() {

    this.recordService.findRecordsID(this.tipoDocumento, 'Odontologia').subscribe((res: any) => {


      this.records = res.records;

      this.recordService.findRecordsID(this.tipoDocumento, 'Urgencia').subscribe((res: any) => {


        this.records = [...this.records, ...res.records];

      });


    });

  }


  consultaOrtodoncia() {

    this.recordService.findRecordsID(this.tipoDocumento, 'Ortodoncia').subscribe((res: any) => {

      this.records = res.records;

      this.recordService.findRecordsID(this.tipoDocumento, 'Urgencia').subscribe((res: any) => {



        this.records = [...this.records, ...res.records];

      });


    });

  }


  showDiv(div: string) {




    if (div === 'R') {
      this.showDivRadiografias = true;
      this.showDivTable = false;
    } else {
      this.showDivRadiografias = false;
      this.showDivTable = true;
    }


  }

  editar() {
    this.eventSubject.next(true);
  }



  eliminar() {

    if(this.history === 'historial odontológico'){

      this.pacienteService.deletePaciente(this.idAux).subscribe((res: any) => {



        if (res.message === 'Paciente eliminado') {


          this.cambiarPagina();
        }else{

            this.toastr.error(res.message, 'Error al eliminar historial', {
              timeOut: 3000,
              positionClass: 'toast-bottom-center',
              progressBar: true,
              progressAnimation: 'increasing',
              closeButton: false,
            });
        }
      });
    }else{



      this.pacienteService.deleteHistoryOrtodoncia(this.idAux).subscribe((res: any) => {
        if (res.success) {
          this.cambiarPagina();
        }else{

          this.toastr.error(res.message, 'Error al eliminar historial', {
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

  cambiarPagina() {
    localStorage.setItem('eliminar', 'true');
    const myButton2 = document.getElementById("myButton2") as HTMLButtonElement;
    myButton2.click();
  }

  historia_Consultar: string;
  id: string;


  // radiografias

  cargarRadiografias() {

    if (this.history === 'historial odontológico') {
      this.historia_Consultar = 'Odontológico'
      this.consultaOdontologia();
    } else {
      this.historia_Consultar = 'Ortodoncia'
      this.consultaOrtodoncia();
    }



    this.imageService.getImagesID(this.id, this.historia_Consultar).subscribe((res: any) => {

      this.images = res.data;
    });


  }


  subirRadiografia() {
    this.eventSubjectAgregarImagen.next(true);
    this.ngOnInit();
    this.cargarRadiografias();

  }

  deleteRadiografia(idImagen: string, ruta: string) {

    this.imageService.deleteImage(idImagen, ruta).subscribe((res: any) => {

      if (res.message === 'Radiografia eliminada') {


        this.toastr.success('Radiografia eliminada con exito', 'OK', {
          timeOut: 3000,
          positionClass: 'toast-bottom-center',
          progressBar: true,
          progressAnimation: 'increasing',
          closeButton: false,

        });


        this.ngOnInit();

      } else {

        this.toastr.error(res.message, 'Error al eliminar radiografia', {
          timeOut: 3000,
          positionClass: 'toast-bottom-center',
          progressBar: true,
          progressAnimation: 'increasing',
          closeButton: false,
        });


      }
    });

  }

  updateRadiografia(idImagen: string) {



      if ( this.verImagen.titulo == "" || this.verImagen.descripcion == "" || this.verImagen.historia == "") {

        this.toastr.warning('Datos faltantes', 'Alerta', {
          timeOut: 3000,
          positionClass: 'toast-bottom-center',
          progressBar: true,
          progressAnimation: 'increasing',
          closeButton: false,
        });

      } else {


        this.imageService.updateImage(idImagen, this.verImagen.titulo, this.verImagen.descripcion, this.verImagen.ruta, this.verImagen.historia, this.selectedFile).subscribe((res: any) => {

          if (res.success) {

            this.toastr.success('Radiografia actualizada con exito', 'OK', {
              timeOut: 3000,
              positionClass: 'toast-bottom-center',
              progressBar: true,
              progressAnimation: 'increasing',
              closeButton: false,

            });


            this.ngOnInit();

          } else {

            this.toastr.error(res.message, 'Error al actualizar radiografia', {
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



  verImagenModal(image: any) {

    this.verImagen = image;

    const verImagenes = document.getElementById("modalVerImagenes") as HTMLButtonElement;
    verImagenes.click();
  }


  previewImage(event: any) {

    this.selectedFile = <File>event.target.files[0];

    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }


  // fin radiografias

  // inicio registros

  nuevoRegistro() {
    this.RegistroForm.value.id = this.id;
    if (Object.values(this.RegistroForm.value).some(val => val === '')) {
    //  console.log('El arreglo está vacío');
    } else {
    //  console.log('El arreglo contiene valores');

      this.recordService.createRecord(this.RegistroForm.value).subscribe((res: any) => {

        if (res.success) {

          this.toastr.success('Registro creado con exito', 'OK', {
            timeOut: 3000,
            positionClass: 'toast-bottom-center',
            progressBar: true,
            progressAnimation: 'increasing',
            closeButton: false,

          });

          this.ngOnInit();


        } else {

          this.toastr.error(res.message, 'Error al crear registro', {
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

  CargarRegistroEditar(registro: any) {

    this.RegistroForm.setValue({
      id: registro.registro_id,
      descripcion: registro.descripcion,
      procedimiento: registro.procedimiento,
      precio: registro.precio,
      fecha: registro.fecha,
      consulta: registro.consulta

    });

  }

  actualizarRegistro() {

    this.recordService.updateRecord(this.RegistroForm.value).subscribe((res: any) => {

      if (res.success) {

        this.toastr.success('Registro actualizado con exito', 'OK', {
          timeOut: 3000,
          positionClass: 'toast-bottom-center',
          progressBar: true,
          progressAnimation: 'increasing',
          closeButton: false,

        });

        this.ngOnInit();

      } else {

        this.toastr.error(res.message, 'Error al actualizar registro', {
          timeOut: 3000,
          positionClass: 'toast-bottom-center',
          progressBar: true,
          progressAnimation: 'increasing',
          closeButton: false,
        });
      }
    });

  }

  eliminarRegistro(idRegistro: number) {

    this.recordService.deleteRecord(idRegistro).subscribe((res: any) => {


      if (res.success) {

        this.toastr.success('Registro eliminado con exito', 'OK', {
          timeOut: 3000,
          positionClass: 'toast-bottom-center',
          progressBar: true,
          progressAnimation: 'increasing',
          closeButton: false,

        });

        this.ngOnInit();
      } else {

        this.toastr.error(res.message, 'Error al eliminar registro', {
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
