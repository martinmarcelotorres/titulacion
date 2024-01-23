import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Funcionario } from '../../models/notificaciones/Funcionario';
import { Entidades } from '../../models/notificaciones/Entidad';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
  private apiUrl = 'http://localhost:8089/api/notification';
  private apiUrlentidad = 'http://localhost:8089/v1/funcionary';
  private url = 'http://localhost:8089/v1/entidad';

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    const url = `${this.apiUrl}/list`;
    return this.http.get(url);
  }
  obtenerDatos(): Observable<any> {
    return this.http.get(this.apiUrlentidad);
  }

  createNotification(notificationData: any) {
    return this.http.post(this.apiUrl, notificationData);
  }

  findAll() {
    return this.http.get<Funcionario[]>(this.apiUrlentidad);
  }

  generarPDFFuncionary() {
    return this.http.get(`http://localhost:8089/api/notification/reporttest`, { responseType: 'arraybuffer' })
  }

  findAllentidad() {
    return this.http.get<Entidades[]>(this.url);
  }
}
