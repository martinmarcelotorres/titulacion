import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { saveAs } from 'file-saver';


@Injectable({
  providedIn: 'root'
})
export class AdolescentService {

  private apiUrl = 'http://localhost:9898/v1/programs';


  httpOptions = { 
    headers: new HttpHeaders({
      'Content-Type' : 'application/json',
      'Authorization': `Bearer ${environment.token}`,
      'Access-Control-Allow-Origin': 'http://localhost:4200'
    })};
  constructor(private http: HttpClient) { }

  getAdolescentList() {
    return this.http.get<any[]>(`${this.apiUrl}/list`, this.httpOptions);
  }

  saveAdolescent(adolescent: any) {
    return this.http.post(`${this.apiUrl}/save`, adolescent).pipe(
      catchError((error: any) => {
        console.error('Error al guardar el adolescente:', error);
        throw error; // Puedes lanzar el error nuevamente o manejarlo según tus necesidades.
      })
    );
  }


  getAdolescentById(id: string): Observable<any> {
    const url = `${this.apiUrl}/find/${id}`;  
    return this.http.get(url);
  }


  updateAdolescent(id: string, updatedAdolescent: any): Observable<any> {
    const url = `${this.apiUrl}/update/${id}`;
    return this.http.put(url, updatedAdolescent);
  }

  generateReport(reportFormat: string): Observable<Blob> {
    const url = `${this.apiUrl}/report/${reportFormat}`;
    return this.http.get(url, { responseType: 'blob' });
  }

  generateReportInactive(reportFormat: string): Observable<Blob> {
    const url = `${this.apiUrl}/reportInactive/${reportFormat}`;
    return this.http.get(url, { responseType: 'blob' });
  }

  generateReportActive(reportFormat: string): Observable<Blob> {
    const url = `${this.apiUrl}/reportActive/${reportFormat}`;
    return this.http.get(url, { responseType: 'blob' });
  }



  deleteAdolescent(id: number): Observable<any> {
    const url = `${this.apiUrl}/delete/${id}`;
    return this.http.delete(url);
  }

  getInactiveAdolescentList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/listI`);
  }

  restoreAdolescent(id: number): Observable<any> {
    const url = `${this.apiUrl}/restore/${id}`;
    return this.http.put(url, null).pipe(
      catchError((error: any) => {
        console.error('Error al restaurar el adolescente ', error);
        throw error; // Puedes lanzar el error nuevamente o manejarlo según tus necesidades.
      })
    );
  }

  


}
