import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Transactional } from '../../models/asignationprograms/transacional.modal';

@Injectable({
  providedIn: 'root'
})
export class AsignacionprogramsService {
  urlactividad= "http://localhost:8089/ms-soa/listData";
  urlprograma= "http://localhost:8089/v1/programs/list";
  url2 = "http://localhost:8089";

  private url = `${this.url2}/api/asignation/programs`;
  asignationSelected: Transactional | undefined = undefined;

  constructor(private http: HttpClient) {}
  
  listaactividaes(): Observable<any>{
    return this.http.get(this.urlactividad);
  }

  listaprogramas(): Observable<any>{
    return this.http.get(this.urlprograma);
  }
  
  listarPorEstado(activo: string): Observable<Transactional[]> {
    const url = `${this.url2}/api/asignation/programs/${activo}`;
    return this.http.get<Transactional[]>(url);
  }

  registrar(datos: any): Observable<any> {
    return this.http.post(`${this.url2}/api/asignation/programs`, datos).pipe(
      catchError((error) => {
        console.error("Error al registrar:", error);
        return throwError(error); 
      })
    );
  }

  actualizarRegistro(id: string  , nuevoRegistro: Transactional): Observable<Transactional> {
    const url = `${this.url2}/api/asignation/programs/${id}`;
    return this.http.put<Transactional>(url, nuevoRegistro);
  }

  activarT(id: string): Observable<any>{
    const url = `${this.url2}/${id}/activar`;
    return this.http.put(url, null);
  }

  generarPDFFuncionary(){
    return this.http.get(`localhost:8082/api/notification/reporttest`,{responseType: 'arraybuffer'})
  }
  generarPDF(): Observable<ArrayBuffer> {
    const url1 = `${this.url}/report/1`;
    return this.http.get(url1, { responseType: 'arraybuffer' });
  }
}
