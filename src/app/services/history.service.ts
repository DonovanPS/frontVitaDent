
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private URL = environment.apiUrl;

  constructor(private httpClient: HttpClient,
    private jwtHelper: JwtHelperService) { }

  createHistory(newHistoryOdontologia:any){
    //console.log("history service");
    return this.httpClient.post(`${this.URL}/history/createNewHistory`,newHistoryOdontologia)
  }

  findHistory(id: any){
    return this.httpClient.get(`${this.URL}/history/findHistory/`+id)
  }


  // obtiene todos los datos de las historias clinicas, se pasa id, tabla a consultar y el campo a comparar del id
  getHistory(id: number, tabla: string, nombreCampo: string) {
    return this.httpClient.get(`${this.URL}/history/gedHistory/${id}/${tabla}/${nombreCampo}`);
  }

  deleteHistory(id: number, tabla: string) {
    return this.httpClient.delete(`${this.URL}/history/deleteHistory/${id}/${tabla}`);
  }

  updateHistory(NewHistoryOdontologia:any, auxId:number){
    return this.httpClient.put(`${this.URL}/history/updateHistoryOdontologia/${auxId}`,NewHistoryOdontologia)
  }

  // Ortodoncia

  crearHistoriaOrtodoncia(ortodoncia:any){
    return this.httpClient.post(`${this.URL}/history/createNewHistoryOrtodoncia`,ortodoncia)
  }

  updateHistoryOrtodoncia(ortodoncia:any, id:number){
    return this.httpClient.put(`${this.URL}/history/updateHistoryOrtodoncia/${id}`,ortodoncia)
  }



}
