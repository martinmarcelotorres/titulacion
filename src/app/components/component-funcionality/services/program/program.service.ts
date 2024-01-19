import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Program } from '../../models/programs/program.model';

@Injectable({
  providedIn: 'root',
})
export class ProgramService {
  private urlFuncionary = `${environment.apiUrlProgram}/v1/programs`;
  funcionarySelected: Program | undefined = undefined;

  constructor(private _http: HttpClient) {}

  findAll() {
    return this._http.get(`${this.urlFuncionary}/list`);
  }

  findAllDataActive() {
    return this._http.get(this.urlFuncionary + '/listA');
  }

  findAllDataInactive() {
    return this._http.get(this.urlFuncionary + '/listI');
  }

  saveNewFuncionary(funcionary: Program) {
    return this._http.post(this.urlFuncionary+ '/save', funcionary);
  }

  updateDataFuncionary(funcionary: Program) {
    return this._http.put(
      this.urlFuncionary + '/update/' + funcionary.id_program,
      funcionary
    );
  }

  deleteLogicalDataFuncionary(funcionary: Program) {
    return this._http.delete(
      this.urlFuncionary + '/delete/' + funcionary.id_program
    );
  }

  reactiveLogicalDataFuncionary(funcionary: Program) {
    return this._http.put(
      this.urlFuncionary + /restore/ + funcionary.id_program,
      funcionary
    );
  }

}
