import { Component, OnInit, ViewChild } from '@angular/core';
import { AttendanceService } from '../../component-funcionality/services/attendance/attendance.service';
import { Router } from '@angular/router';
import { Attendance } from '../../component-funcionality/models/attendance/attendance.model';
import { AttendancetransactionDataComplete } from '../../component-funcionality/models/attendance/transactionDataCompleteAttendance.model';
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-attendance-principal',
  templateUrl: './attendance-principal.component.html',
  styleUrls: ['./attendance-principal.component.scss']
})
export class AttendancePrincipalComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  operativeunitData: any[] = [];
  programData: any[] = [];
  asignationData: any[] = [];
  funcionaryColumns: string[] = [
    'idprogram',
    'dataActivies',
    'dataActivies2',
    'dataActivies3',
    'dniActivies',
    'dataTeen',
    'dniTeen',
    'soaTeen',
    'dataAttendance',
    'actions'
  ];

  dataSource = new MatTableDataSource(this.asignationData);
  selectedAttendanceFilter: string = 'all';


  
  dataTeenFilter: string = '';  // Agrega esta línea
  dniTeenFilter: string = '';   // Agrega esta línea
  otherColumnFilter: string = '';  // Agrega esta línea

  constructor(private asignationService: AttendanceService,
    private router: Router) {

  }

  ngOnInit(): void {
    this.findAllDataActive();
    this.findAllDataUbigeo();
    this.findAllDataUbigeo2();
  }

  navigateToForm() {
    this.router.navigate(['asignation-form']).then(() => {
      //console.log('Se está redirigiendo al formulario de registro.')
    });
  }

  filters: { [key: string]: string } = {};  

  applyFilter(column: string, event: any) {
    console.log('applyFilter called');
    console.log('Filter Column:', column);
    console.log('Filter Value:', event);
  
    // Asegúrate de que filters esté inicializado antes de asignar valores
    if (!this.filters) {
      this.filters = {};
    }
  
    let filterValue = '';
  
    if (event && event.target) {
      filterValue = event.target.value.toLowerCase();
    } else if (event && event.value !== undefined) {
      filterValue = event.value.toLowerCase();
    }
  
    console.log('Filter Column:', column);
    console.log('Filter Value:', filterValue);
  
    // Almacena el filtro para la columna actual
    this.filters[column] = filterValue;
  
    // Aplica todos los filtros acumulativamente
    this.dataSource.data = this.asignationData.filter(data => {
      const result = Object.keys(this.filters).every(key => {
        const value = this.filters[key];
  
        if (key === 'all') {
          return true;
        } else if (key === 'dataTeen') {
          return (
            data.teeneger &&
            (data.teeneger.name.toLowerCase().includes(value) ||
              data.teeneger.surnameFather.toLowerCase().includes(value) ||
              data.teeneger.surnameMother.toLowerCase().includes(value))
          );
        } else if (key === 'dniTeen') {
          return data.teeneger && data.teeneger.dni.toLowerCase().includes(value);
        } else if (key === 'asistencia') {
          const asistenciaFilterResult = value === '' ||
            (data.attemdance && data.attemdance.asistencia.toLowerCase().includes(value));
          console.log('Asistencia Filter Result:', asistenciaFilterResult);
          return asistenciaFilterResult;
        } else if (key === 'soaTeen') {
          return (
            data.teeneger &&
            this.getDataCompleteOperativeUnitById(data.teeneger.id_operativeunit).toLowerCase().includes(value)
          );
        } else {
          return data[key] && data[key].toLowerCase().includes(value);
        }
      });
  
      return result;
    });
  
    // Restablece el paginador a la primera página
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  

  applyFilter2(column: string, event: any) {
    console.log('applyFilter called');
    console.log('Filter Column:', column);
    console.log('Filter Value:', event);
  
    // Asegúrate de que filters esté inicializado antes de asignar valores
    if (!this.filters) {
      this.filters = {};
    }
  
    let filterValue = '';
  
    if (event && event.target) {
      filterValue = event.target.value.toLowerCase();
    } else if (event && event.value !== undefined) {
      filterValue = event.value.toLowerCase();
    }
  
    console.log('Filter Column:', column);
    console.log('Filter Value:', filterValue);
  
    // Almacena el filtro para la columna actual
    this.filters[column] = filterValue;
  
    // Aplica todos los filtros acumulativamente
    this.dataSource.data = this.asignationData.filter(data => {
      const result = Object.keys(this.filters).every(key => {
        const value = this.filters[key];
  
        if (key === 'all') {
          return true;
        } else if (key === 'dataTeen') {
          return (
            data.teeneger &&
            (data.teeneger.name.toLowerCase().includes(value) ||
              data.teeneger.surnameFather.toLowerCase().includes(value) ||
              data.teeneger.surnameMother.toLowerCase().includes(value))
          );
        } else if (key === 'dniTeen') {
          return data.teeneger && data.teeneger.dni.toLowerCase().includes(value);
        } else if (key === 'asistencia') {
          const asistenciaFilterResult = value === '' ||
            (data.attemdance && data.attemdance.asistencia.toLowerCase().includes(value));
          console.log('Asistencia Filter Result:', asistenciaFilterResult);
          return asistenciaFilterResult;
        } else {
          return data[key] && data[key].toLowerCase().includes(value);
        }
      });
  
      return result;
    });
  
    // Restablece el paginador a la primera página
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  


  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: '2-digit' };
    return date.toLocaleDateString('es-ES', options);
  }

  getAttendanceStatusText(attendanceStatus: string): string {
    return attendanceStatus === 'A' ? 'Asistió' : 'No asistió';
  }

  findAllDataAsignation() {
    this.asignationService.findAll().subscribe((dataAsignation: any) => {
      console.log('Datos de la asignación: ', dataAsignation);
      //this.asignationData = dataAsignation; => No hace el filtrado por datos activos.
    });
  }

  findAllDataActive() {
    this.asignationService.findAllDataActive().subscribe((dataAsignationActive: any) => {
      console.log('Datos de la asignación en modo Activo: ', dataAsignationActive);
      this.asignationData = dataAsignationActive;
      this.dataSource = new MatTableDataSource(this.asignationData);
      this.dataSource.paginator = this.paginator;
    });
  }

  updateDataAsignation(attendance: Attendance) {
    this.asignationService.asignationSelected = attendance;
    this.navigateToForm();
    this.findAllDataAsignation();
  }

  updateTwoWayDataAsignation(twoWayAsignation: AttendancetransactionDataComplete) {
    this.asignationService.transactionSelected = twoWayAsignation;
    this.navigateToForm();
    this.findAllDataAsignation();
  }

  deleteLogical(attendance: Attendance) {
    this.asignationService.deleteLogicalDataAsignation(attendance).subscribe((dataDeleteLogical) => {
      console.log('Se esta eliminando el dato de: ', dataDeleteLogical);
      this.findAllDataActive();
    });
  }

  deleteDataCompleteAsignation(attendance: Attendance) {
    this.asignationService.deleteDataAsignationComplete(attendance).subscribe((dataDeleteCompleteAsignation) => {
      console.log('El dato eliminado es: ', dataDeleteCompleteAsignation);
      this.findAllDataActive();
    });
  }

  findAllDataUbigeo() {
    this.asignationService
      .findAllDataUbigeoAddress()
      .subscribe((dataUbigeo: any) => {
        console.log('Programa Data: ', dataUbigeo); // Running successfully
        this.programData = dataUbigeo;
      });
  }

  findAllDataUbigeo2() {
    this.asignationService
      .findAllDataUbigeoAddress2()
      .subscribe((dataUbigeo: any) => {
        console.log('Operative Unit Data : ', dataUbigeo); // Running successfully
        this.operativeunitData = dataUbigeo;
      });
  }


  getDataCompleteProgramById(idProgram: number) {
    const program = this.programData.find((item) => item.id_program === idProgram);

    if (program) {
      return `${program.name}`;
    } else {
      return 'Programa no encontrado.';
    }
  }

  getDataCompleteOperativeUnitById(idOperativeUnit: number) {
    const unit = this.operativeunitData.find((item) => item.id_operativeunit === idOperativeUnit);

    if (unit) {
      return `${unit.name}`;
    } else {
      return 'Sou una Operative Unit de Ejemplo.';
    }
  }
}
