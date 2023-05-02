import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  private URL = environment.apiUrl;

constructor(private httpClient: HttpClient,
  private jwtHelper: JwtHelperService) {}

  validar(id: number){
    return this.httpClient.get(`${this.URL}/paciente/countpaciente/`+id)
  }

  getPaciente(id: number){
    return this.httpClient.get(`${this.URL}/paciente/`+id)
  }

  deletePaciente(id: number){
    return this.httpClient.get(`${this.URL}/paciente/deletePaciente/`+id)
  }

  deleteHistoryOrtodoncia(id: number){
    return this.httpClient.delete(`${this.URL}/history/deleteHistoryOrtodoncia/`+id)
  }

  getPacientes(){
    return this.httpClient.get(`${this.URL}/paciente/`)
  }



}
