import { AfterViewInit, Component, ViewChild } from '@angular/core';

import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { AdolescenteService } from 'src/app/components/programs/adolescenteBulk.service';
import { ProgramaService } from 'src/app/components/programs/programa.service';
import { TransaccionService } from 'src/app/components/programs/transaccion.service';

import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { NativeDateAdapter } from '@angular/material/core';
import { SelectionModel } from '@angular/cdk/collections';
import { TeenDto, asignationTeenDto } from './asignationTeenDto';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HotToastService } from '@ngneat/hot-toast';


class CustomDateAdapter extends NativeDateAdapter{
  override format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      const day = date.getDate();
      const month = date.toLocaleString('default', { month: 'long' });
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    }
    return date.toDateString();
  }
}

export const MY_FORMATS = {
  parse: {
    dateInput: { day: 'numeric', month: 'long', year: 'numeric' },
  },
  display: {
    dateInput: 'input',
    monthYearLabel: 'MMM yyyy',
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: 'MMMM yyyy',
  },
};


@Component({
  selector: 'app-bulk',
  templateUrl: './bulk.component.html',
  styleUrls: ['./bulk.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: CustomDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})

export class BulkComponent {
  title = 'frontend_transaccional';
  adolescents: any[] = [];
  programs: any[] = [];
  asignations: any[] = [];
  listIdTeen: any[] = [];
  selectedPrograms: any[] = [];
  selectedAdolescents: any[] = [];
  selectedDate: Date | null = null;
  newAsignation: any = {};
  id_program: number = 0;
  assignment_date: string = "";
  selection = new SelectionModel<any>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<any>();
  
  constructor(
    private adolescenteService: AdolescenteService,
    private programaService: ProgramaService,
    private transaccionService: TransaccionService,
    private router: Router,
    private toastServices: HotToastService) {}

  ngOnInit(): void {
    this.loadAdolescents();
    this.loadPrograms();
    this.loadAsignations();
  }

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    this.newAsignation.assignment_date = event.value;
  }

  enviarForm() {

    const asignationTeen = new asignationTeenDto();

    asignationTeen.teens = this.listIdTeen,
    asignationTeen.id_program = this.id_program,
    asignationTeen.assignment_date = this.assignment_date,

    this.transaccionService.saveAsignations(asignationTeen).subscribe(() => {
      this.toastServices.success('Adolescente registrado exitosamente');
      this.listIdTeen =[];
      this.id_program = 0;
      this.assignment_date = ''
      this.selection.clear();
    });
  }

  loadAdolescents(): void {
    this.adolescenteService.getAdolescentList().subscribe(data => {
      this.adolescents = data;
    });
  }

  loadPrograms(): void {
    this.programaService.getProgramsList().subscribe(dataP => {
      this.programs = dataP;
    });
  }

  loadAsignations(): void {
    this.transaccionService.getAsignationsList().subscribe(dataAs => {
      this.asignations = dataAs;
      this.dataSource = new MatTableDataSource(dataAs);
      this.dataSource.paginator = this.paginator;
    });
  }

  selectAllA() {
    this.selectedAdolescents = this.adolescents.map(adolescent => adolescent.id_adolescent);
  }

  selectAllP() {
    this.selectedPrograms = this.programs.map(program => program.id_program);
  }


  deselectAllA() {
    this.selectedAdolescents = [];
  }

  deselectAllP() {
    this.selectedPrograms = [];
  }


  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.adolescents.forEach((row: any) => {
        this.selection.select(row);
        
        let Teen: TeenDto = {
          id_adolescent: row.id_adolescente
        };
        this.listIdTeen.push(Teen);
      })
      console.log(this.listIdTeen)
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.adolescents.length;
    return numSelected === numRows;
  }

  seleccionado(seleccionado: any) {
    this.selection.toggle(seleccionado);
    console.log("selecione uno "+ seleccionado.name)
    let Teen: TeenDto = {
      id_adolescent: seleccionado.id_adolescente
    };

    this.listIdTeen.push(Teen)

    console.log(this.listIdTeen)
  }

  generarPDF() {
    this.transaccionService.getReporte().subscribe((res) => {
      const file = new Blob([res], { type: 'application/pdf' });
      const url = URL.createObjectURL(file);
      const pdfWindow = window.open();
      if (pdfWindow) {
        this.toastServices.success('Se genero Exitosamente el reporte');
        pdfWindow.location.href = url;
      } else {
        this.toastServices.info('El navegador bloqueó la apertura de la ventana emergente. Por favor, asegúrate de desbloquear las ventanas emergentes para este sitio.');
      }
    })
  }
}
