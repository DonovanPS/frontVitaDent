import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import ImageService from 'src/app/services/image.service';
import { ToastrService } from 'ngx-toastr';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit, OnDestroy{

  @Input() eventSubject: Subject<boolean>;
  subscription: Subscription;


  imageForm: FormGroup;
  imageUrl: string;
  selectedFile: File;

  id: string;
  history: string;

  constructor(

    private imageService: ImageService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,

  ){
    this.imageForm = this.formBuilder.group({
      file: [''],
      description: [''],
      title: [''],
      history: [''],
    });
  }



  // radiografias

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

  ngOnInit(): void {

    const buttonSubirImagen = document.getElementById('subirImagen') as HTMLButtonElement;
    buttonSubirImagen.style.display = 'none';



    const idPaciente = localStorage.getItem('paciente');
    this.id = idPaciente !== null ? idPaciente : '';

    const history = localStorage.getItem('historial');
    this.history = history !== null ? history : '';

    if (history === '1. Historial Odontológico') {
      this.history = 'Odontológico'

    } else if (history === '2. Historial Ortodoncia') {
      this.history = 'Ortodoncia'
    }

    // suscripcion para activar el boton de agregar radiografia
    if (this.eventSubject) {
      this.subscription = this.eventSubject.asObservable().subscribe(
        res => this.onSubmit()
      )
    }

  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSubmit() {



    this.imageForm.value.file = this.selectedFile;


    if(this.imageForm.value.file == null || this.imageForm.value.title == "" || this.imageForm.value.description == "" || this.imageForm.value.history == ""){

      this.toastr.warning('Datos faltantes', 'Alerta', {
          timeOut: 3000,
          positionClass: 'toast-bottom-center',
          progressBar: true,
          progressAnimation: 'increasing',
          closeButton: false,
        });



    }else{



      this.imageService.uploadImage( this.id, this.imageForm.value.title, this.imageForm.value.description,this.imageForm.value.history, this.selectedFile).subscribe((res: any) => {



        if(res.success){

          //console.log("se cargo la radiografia");


          this.toastr.success('Radiografia cargada con exito', 'OK', {
            timeOut: 3000,
            positionClass: 'toast-bottom-center',
            progressBar: true,
            progressAnimation: 'increasing',
            closeButton: false,

          });

        }else{


            this.toastr.error('Error al cargar la radiografia', 'Error', {
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






}
