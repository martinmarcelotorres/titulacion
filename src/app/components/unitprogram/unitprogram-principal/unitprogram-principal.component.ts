import {Component, OnInit, ViewChild} from '@angular/core';
import { unitprogramervice } from '../../component-funcionality/services/unitprogram/unitprogram.service';
import { Router } from '@angular/router';
import { unitprogram } from '../../component-funcionality/models/unitprogram/unitprogram.model';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table"
import { transactionDataCompleteoperationalprogramResponse } from '../../component-funcionality/models/unitprogram/transactionDataComplete.model';
import { SafeResourceUrl } from '@angular/platform-browser';
import { HotToastService } from '@ngneat/hot-toast';
@Component({
  selector: 'app-unitprogram-principal',
  templateUrl: './unitprogram-principal.component.html',
  styleUrls: ['./unitprogram-principal.component.scss']
})
export class UnitprogramPrincipalComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pdfSrc: SafeResourceUrl | null = null;
  asignationData: any[] = [];
  withOutBodyAsignation: any[] = [];
  funcionaryColumns: string[] =
    ['dataFuncionary',
      'dniFuncionary',
      'dataTeen',
      'dniTeen',
      'descripcionAsignacion',
      'actions'];

  dataSource = new MatTableDataSource(this.asignationData);

  constructor(private unitprogramService: unitprogramervice,
              private router: Router, private toastServices: HotToastService) {
  }

  ngOnInit(): void {
    this.findAllDataActive();
    this.findAllDataWithoutBody();
  }


  

  navigateToForm() {
    this.router.navigate(['unitprogram-form']).then(() => {
      //console.log('Se está redirigiendo al formulario de registro.')
    })
  }

  generarPDF(): void {
    this.toastServices.success('Generando PDF...', {
      duration: 3000,
    });

    setTimeout(() => {
      this.unitprogramService
        .generarPDF()
        .subscribe((response: ArrayBuffer) => {
          const file = new Blob([response], { type: 'application/pdf' });
          const url = URL.createObjectURL(file);
          const pdfWindow = window.open();
          if (pdfWindow) {
            pdfWindow.location.href = url;
          } else {
            alert(
              'El navegador bloqueó la apertura de la ventana emergente. Por favor, asegúrate de desbloquear las ventanas emergentes para este sitio.'
            );
          }
        });
    }, 3500);
  }

  findAllDataWithoutBody() {
    this.unitprogramService.findAllDatosWithoutBody().subscribe((dataAllWithoutBody: any) => {
      console.log('Datos encontrados sin cuerpo de relleno son: ', dataAllWithoutBody);
      this.withOutBodyAsignation = dataAllWithoutBody;
    })
  }

  findAllDataAsignation() {
    this.unitprogramService.findAll().subscribe((dataAsignation: any) => {
      console.log('Datos de la asignación: ', dataAsignation);
      //this.asignationData = dataAsignation; => No hace el filtrado por datos activos.
    })
  }

  findAllDataActive() {
    this.unitprogramService.findAllDataActive().subscribe((dataAsignationActive: any) => {
      console.log('Datos de la asignación en modo Activo: ', dataAsignationActive);
      this.asignationData = dataAsignationActive;
      this.dataSource = new MatTableDataSource(this.asignationData);
      this.dataSource.paginator = this.paginator;
    })
  }

  updateDataAsignation(asignation: unitprogram) {
    this.unitprogramService.asignationSelected = asignation;
    this.navigateToForm();
    this.findAllDataAsignation();
  }

  updateTwoWayDataAsignation(twoWayAsignation: transactionDataCompleteoperationalprogramResponse) {
    this.unitprogramService.transactionSelected = twoWayAsignation;
    this.navigateToForm();
    this.findAllDataAsignation();
  }

  deleteLogical(asignation: unitprogram) {
    this.unitprogramService.deleteLogicalDataAsignation(asignation).subscribe((dataDeleteLogical) => {
      console.log('Se esta eliminando el dato de: ', dataDeleteLogical);
      this.findAllDataActive();
    })
  }

  deleteDataCompleteAsignation(asignation: unitprogram) {
    this.unitprogramService.deleteDataAsignationComplete(asignation).subscribe((dataDeleteCompleteAsignation) => {
      console.log('El dato eliminado es: ', dataDeleteCompleteAsignation);
      this.findAllDataActive();
    })
  }
}