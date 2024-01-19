import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { unitprogram } from '../../models/unitprogram/unitprogram.model';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import { transactionDataCompleteoperationalprogramResponse } from '../../models/unitprogram/transactionDataComplete.model';

@Injectable({
  providedIn: 'root',
})
export class unitprogramervice {
  private urlAsignation = `${environment.apiUrlUnitProgram}/api/transaccionalData`;
  asignationSelected: unitprogram | undefined = undefined;
  transactionSelected: transactionDataCompleteoperationalprogramResponse | undefined = undefined;

  constructor(private _http: HttpClient) {}

  findAll() {
    return this._http.get(this.urlAsignation + '/listData');
  }

  findAllDatosWithoutBody() {
    return this._http.get(this.urlAsignation + '/listDataIdRegister');
  }

  findAllDataActive() {
    return this._http.get(this.urlAsignation + '/listData/active');
  }

  findDataIdRegister() {
    return this._http.get(this.urlAsignation + '/listDataIdRegister');
  }

  findDataTeenNoRegistered() {
    return this._http.get(this.urlAsignation + '/listData/noRegisteredTeen');
  }

  findAllDataInactive() {
    return this._http.get(this.urlAsignation + '/listData/inactive');
  }

  saveNewAsignation(asignation: unitprogram) {
    return this._http.post(this.urlAsignation, asignation);
  }

  updateDataAsignation(asignation: unitprogram) {
    return this._http.put(
      this.urlAsignation + '/' + asignation.id_funcionaryteend,
      asignation
    );
  }

  updateTwoWayAsignation(twoWayAsignation: transactionDataCompleteoperationalprogramResponse) {
    return this._http.put(
      this.urlAsignation +
        '/' +
        twoWayAsignation.transaccionalAllocation.id_funcionaryteend,
      twoWayAsignation
    );
  }

  deleteLogicalDataAsignation(asignation: unitprogram) {
    return this._http.patch(
      this.urlAsignation + '/deleteLogical/' + asignation.id_funcionaryteend,
      asignation
    );
  }

  reactiveLogicalDataAsignation(asignation: unitprogram) {
    return this._http.patch(
      this.urlAsignation + '/reactiveLogical/' + asignation.id_funcionaryteend,
      asignation
    );
  }

  deleteDataAsignationComplete(asignation: unitprogram) {
    return this._http.delete(
      this.urlAsignation + '/' + asignation.id_funcionaryteend
    );
  }

  saveMasive(dto: any): Observable<void> {
    return this._http.post<void>(`${this.urlAsignation}/bulk`, dto);
  }


  generarPDF(): Observable<ArrayBuffer> {
    const url = `${this.urlAsignation}/report`;
    return this._http.get(url, { responseType: 'arraybuffer' });
  }

}
