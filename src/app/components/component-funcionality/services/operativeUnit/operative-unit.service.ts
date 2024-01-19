import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { OperativeUnit } from '../../models/operativeUnit/operativeUnit.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OperativeUnitService {
  private urlFuncionary = `${environment.apiUrlAsignation}/ms-soa`;
  private urlUbigeoAddress = `${environment.apiUrlUbigeoAddress}/api/address`;
  funcionarySelected: OperativeUnit | undefined = undefined;

  constructor(private _http: HttpClient) {}

  findAll() {
    return this._http.get(`${this.urlFuncionary}/listData`);
  }

  findAllDataActive() {
    return this._http.get(this.urlFuncionary + '/listData/active');
  }

  findDataRankLegalGuardian() {
    return this._http.get(this.urlFuncionary + '/listData/active');
  }

  findAllDataInactive() {
    return this._http.get(this.urlFuncionary + '/listData/inactive');
  }

  findAllDataUbigeoAddress() {
    return this._http.get(this.urlUbigeoAddress + '/listData');
  }

  saveNewFuncionary(funcionary: OperativeUnit) {
    return this._http.post(this.urlFuncionary, funcionary);
  }

  updateDataFuncionary(funcionary: OperativeUnit) {
    return this._http.put(
      this.urlFuncionary + '/' + funcionary.id_operativeunit,
      funcionary
    );
  }

  deleteLogicalDataFuncionary(funcionary: OperativeUnit) {
    return this._http.patch(
      this.urlFuncionary + '/deleteLogical/' + funcionary.id_operativeunit,
      funcionary
    );
  }

  reactiveLogicalDataFuncionary(funcionary: OperativeUnit) {
    return this._http.patch(
      this.urlFuncionary + /reactiveLogical/ + funcionary.id_operativeunit,
      funcionary
    );
  }

  generarPDF(): Observable<ArrayBuffer> {
    const url = `${this.urlFuncionary}/export-pdf`;
    return this._http.get(url, { responseType: 'arraybuffer' });
  }

}
