import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Modules

import { FormsModule, ReactiveFormsModule} from '@angular/forms'
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';

// Providers
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { HistorySearchComponent } from './components/history-search/history-search.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NewHistoryComponent } from './components/new-history/new-history.component';
import { SonHistorySearchComponent } from './components/son-history-search/son-history-search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { SonNewHistoryFormOdontologyComponent } from './components/son-new-history-form-odontology/son-new-history-form-odontology.component';
import { SonNewHistoryFormAnamnesisComponent } from './components/son-new-history-form-anamnesis/son-new-history-form-anamnesis.component';
import { SonNewHistoryExamenPeriodontalComponent } from './components/son-new-history-examen-periodontal/son-new-history-examen-periodontal.component';
import { SonNewHistoryExamenTejidosDentalesComponent } from './components/son-new-history-examen-tejidos-dentales/son-new-history-examen-tejidos-dentales.component'
import { SonNewHistoryExamenTejidosblandosComponent } from './components/son-new-history-examen-tejidos-blandos/son-new-history-examen-tejidos-blandos.component';
import { RecordsComponent } from './components/records/records.component';
import { PatientComponent } from './components/patient/patient.component';

import { SonPatientOdontologiaComponent } from './components/son-patient-odontologia/son-patient-odontologia.component';
import { SonPatientOrtodonciaComponent } from './components/son-patient-ortodoncia/son-patient-ortodoncia.component';

import { ToastrModule } from 'ngx-toastr';
import { NewHistoryOrtodonciaComponent } from './components/new-history-ortodoncia/new-history-ortodoncia.component';
import { UploadImageComponent } from './components/upload-image/upload-image.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HistorySearchComponent,
    NavbarComponent,
    NewHistoryComponent,
    SonHistorySearchComponent,
    SonNewHistoryFormOdontologyComponent,
    SonNewHistoryFormAnamnesisComponent,
    SonNewHistoryExamenPeriodontalComponent,
    SonNewHistoryExamenTejidosDentalesComponent,
    SonNewHistoryExamenTejidosblandosComponent,
    RecordsComponent,
    PatientComponent,
    SonPatientOdontologiaComponent,
    SonPatientOrtodonciaComponent,
    NewHistoryOrtodonciaComponent,
    UploadImageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    ToastrModule.forRoot(),
    NgbModule,
    NgbCarouselModule,


  ],
  exports: [
    HomeComponent,
    NavbarComponent
  ],
  providers: [
    //JWT
    {provide: JWT_OPTIONS, useValue:JWT_OPTIONS},
    JwtHelperService,
    // Token Interceptor
    {provide: HTTP_INTERCEPTORS,useClass: TokenInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
