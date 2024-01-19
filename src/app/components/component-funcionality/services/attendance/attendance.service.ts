import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Attendance } from '../../models/attendance/attendance.model';
import { AttendancetransactionDataComplete } from '../../models/attendance/transactionDataCompleteAttendance.model';
@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  private urlAsignation = `${environment.apiUrlAttendance}/api/transaccionalData`;
  private urlUbigeoAddress = `${environment.apiUrlProgram}/v1/programs`;
  private urlUbigeoAddress2 = `${environment.apiUrlAsignation}/ms-soa`;
  asignationSelected: Attendance | undefined = undefined;
  transactionSelected: AttendancetransactionDataComplete | undefined = undefined;

  constructor(private _http: HttpClient) {}

  findAll() {
    return this._http.get(this.urlAsignation + '/listData');
  }

  findAllDatosWithoutBody() {
    return this._http.get(this.urlAsignation + '/listDataIdRegister');
  }

  findAllDataUbigeoAddress() {
    return this._http.get(this.urlUbigeoAddress + '/list');
  }

  findAllDataUbigeoAddress2() {
    return this._http.get(this.urlUbigeoAddress2 + '/listData');
  }

  findAllDataActive() {
    return this._http.get(this.urlAsignation + '/listData');
  }

  findDataIdRegister() {
    return this._http.get(this.urlAsignation + '/listDatar');
  }

  findDataTeenNoRegistered() {
    return this._http.get(this.urlAsignation + '/listData/noRegisteredTeen');
  }

  findAllDataInactive() {
    return this._http.get(this.urlAsignation + '/listData/inactive');
  }

  saveNewAsignation(asignation: Attendance) {
    return this._http.post(this.urlAsignation, asignation);
  }

  updateDataAsignation(asignation: Attendance) {
    return this._http.put(
      this.urlAsignation + '/' + asignation.id_act_teen,
      asignation
    );
  }

  updateTwoWayAsignation(twoWayAsignation: AttendancetransactionDataComplete) {
    return this._http.put(
      this.urlAsignation +
        '/' +
        twoWayAsignation.TransaccionalActTeen.id_act_teen,
      twoWayAsignation
    );
  }

  deleteLogicalDataAsignation(asignation: Attendance) {
    return this._http.patch(
      this.urlAsignation + '/deleteLogical/' + asignation.id_act_teen,
      asignation
    );
  }

  reactiveLogicalDataAsignation(asignation: Attendance) {
    return this._http.patch(
      this.urlAsignation + '/reactiveLogical/' + asignation.id_act_teen,
      asignation
    );
  }

  deleteDataAsignationComplete(asignation: Attendance) {
    return this._http.delete(
      this.urlAsignation + '/' + asignation.id_act_teen
    );
  }

}
