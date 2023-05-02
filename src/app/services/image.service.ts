import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export default class ImageService {

  constructor(private httpClient: HttpClient,
    private jwtHelper: JwtHelperService) { }

  uploadImage(id: string, title: string, description: string, history: string, file: File) {

    const fd = new FormData();
    fd.append('title', title);
    fd.append('description', description);
    fd.append('file', file);

    return this.httpClient.post(`${environment.apiUrl}/image/upload/${id}/${history}`, fd);

  }

  getImagesID(id: string, history: string) {
    return this.httpClient.get(`${environment.apiUrl}/image/getImages/${id}/${history}`);
  }

  deleteImage(id: string, ruta: string) {
    return this.httpClient.get(`${environment.apiUrl}/image/deleteImage/${id}/${ruta}`);
  }

  updateImage(id: string, title: string, description: string, ruta: string, historia: string, file: File) {

    const fd = new FormData();
    fd.append('title', title);
    fd.append('description', description);
    fd.append('history', historia);
    fd.append('file', file);


    return this.httpClient.put(`${environment.apiUrl}/image/updateImage/${id}/${ruta}`, fd);
  }

  


}
