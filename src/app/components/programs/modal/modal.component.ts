import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdolescentListComponent } from '../adolescent-list/adolescent-list.component';  
import { AdolescentService } from 'src/app/components/programs/adolescent.service';
import { saveAs } from 'file-saver';
import { MatSelectChange } from '@angular/material/select';
import { HotToastService } from '@ngneat/hot-toast';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  selectedOption: string | null = null;

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,    private toastServices: HotToastService
,    private adolescentService: AdolescentService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    const adolescentsComponent: AdolescentListComponent = data.adolescents;
    // Ahora puedes acceder a las propiedades y métodos de adolescentsComponent
  }

  

  onNoClick(): void {
    this.dialogRef.close();
  }


 onSelectionChange(event: MatSelectChange): void {
        this.selectedOption = event.value;
    }

    onDownloadButtonClick(): void {
        if (this.selectedOption === 'T') {
            this.generateReport();
            this.toastServices.success('Reporte general generado exitosamente');
        }
        else if(this.selectedOption === 'I') {
            this.generateReportInactive();
            this.toastServices.success('Reporte por inactivos generado exitosamente');
        }
        else if(this.selectedOption === 'A') {
          this.generateReportActive();
          this.toastServices.success('Reporte por activos generado exitosamente');

        }
        // Aquí puedes agregar lógica adicional o simplemente dejarlo así
    }
 
  generateReport(): void {
    this.adolescentService.generateReport('pdf').subscribe(
      (data: Blob) => {
        const filename = 'reporte_programas.pdf';
        saveAs(data, filename);
      },
      (error) => {
        console.error('Error al generar el informe:', error);
        // Puedes manejar el error según tus necesidades.
      }
    );}

    generateReportInactive(): void {
      this.adolescentService.generateReportInactive('pdf').subscribe(
        (data: Blob) => {
          const filename = 'reporte_programas_inactive.pdf';
          saveAs(data, filename);
        },
        (error) => {
          console.error('Error al generar el informe:', error);
          // Puedes manejar el error según tus necesidades.
        }
      );}

      generateReportActive(): void {
        this.adolescentService.generateReportActive('pdf').subscribe(
          (data: Blob) => {
            const filename = 'reporte_programas_active.pdf';
            saveAs(data, filename);
          },
          (error) => {
            console.error('Error al generar el informe:', error);
            // Puedes manejar el error según tus necesidades.
          }
        );}

}
