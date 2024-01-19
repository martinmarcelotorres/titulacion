import { OnInit, AfterViewInit, Component, ViewChild} from '@angular/core';
import { AdolescentService } from 'src/app/components/component-funcionality/services/programs/adolescent.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';  
import { HotToastService } from '@ngneat/hot-toast';
import { MatPaginator } from '@angular/material/paginator';



@Component({
  selector: 'app-adolescent-list',
  templateUrl: './adolescent-list.component.html',
  styleUrls: ['./adolescent-list.component.scss'],
  providers: [DatePipe],
})
export class AdolescentListComponent implements OnInit {
  adolescents: any[] = [];
  filteredAdolescents: any[] = [];
  showEditForm = false;
  editedAdolescent: any = {};
  filterByStatus: string = 'A';
  isDeleteButton: boolean = true;
  nameFilter: string = '';
  reportFormat: string = 'pdf';
  reportResult: string = '';
  levelFilter: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private adolescentService: AdolescentService,
    private router: Router,
    public dialog: MatDialog,
    private toastServices: HotToastService
  ) {
  }
  ngOnInit(): void {
    this.adolescentService.getAdolescentList().subscribe(
      (data) => {
        this.adolescents = data;
        this.filteredAdolescents = data.slice();
       
        this.onPageChange({ pageIndex: 1, pageSize: this.paginator.pageSize });
      },
      (error) => {
        console.error('Error al obtener la lista de adolescentes:', error);
      }
    );
  }
  
  onPageChange(event: any): void {
    if (this.paginator) {
      const startIndex = event.pageIndex * event.pageSize;
      const endIndex = startIndex + event.pageSize;
      this.filteredAdolescents = this.adolescents.slice(startIndex, endIndex);
    }
  }

  loadAdolescents(): void {
    if (this.filterByStatus === 'A') {
      this.adolescentService.getAdolescentList().subscribe(data => {
        this.adolescents = data;
        this.filteredAdolescents = data;
      });
    } else if (this.filterByStatus === 'I') {
      this.adolescentService.getInactiveAdolescentList().subscribe(data => { // Asegúrate de usar getInactivePersonList()
        this.adolescents = data;
        this.filteredAdolescents = data;
      });
    } else {
      this.adolescentService.getAdolescentList().subscribe(data => {
        this.adolescents = data;
        this.filteredAdolescents = data;
      });
    }
  }

  openEditForm(adolescent: any): void {
    this.editedAdolescent = { ...adolescent };
    this.editedAdolescent.startDate = this.formatDate(this.editedAdolescent.startDate);
    this.editedAdolescent.endDate = this.formatDate(this.editedAdolescent.endDate);
    this.showEditForm = true;
    console.log('Open Edit Form - Edited Adolescent:', this.editedAdolescent);

  }

  closeEditForm(): void {
    this.showEditForm = true;
    this.editedAdolescent = {}; // Limpiar los datos editados
    console.log('Close Edit Form - Edited Adolescent:', this.editedAdolescent);

  }

  navigateToAdolescentForm(): void {
    this.router.navigate(['/adolescent-form']);
  }
  

  formatDate(dateString: string): string {
    const [day, month, year] = dateString.split('-');
    return `${year}-${month}-${day}`;
  }
  
  saveEditedAdolescent(): void {
    // Formatea las fechas antes de enviarlas al backend
    this.editedAdolescent.startDate = this.formatDate(this.editedAdolescent.startDate);
    this.editedAdolescent.endDate = this.formatDate(this.editedAdolescent.endDate);
  
    // Aplicar la validación antes de realizar la actualización
    if (this.validateAdolescentFields(this.editedAdolescent)) {
      this.adolescentService.updateAdolescent(this.editedAdolescent.id, this.editedAdolescent).subscribe(() => {
        this.showEditForm = false;
        this.editedAdolescent = {};
        this.adolescentService.getAdolescentList().subscribe(data => {
          this.adolescents = data;
        });
      });
      this.toastServices.success('Programa actualizado exitosamente');
    }
  }
  
  validateAdolescentFields(adolescent: any): boolean {
    // Validar que los campos no contengan números
    if (
      /\d/.test(adolescent.name) ||
      /\d/.test(adolescent.type) ||
      /\d/.test(adolescent.beneficiary) ||
      /\d/.test(adolescent.responsible) ||
      /\d/.test(adolescent.level)
    ) {
      this.toastServices.error(
        'LOS CAMPOS NOMBRE, TIPO, BENEFICIARIO Y RESPONSABLE NO DEBEN CONTENER NÚMEROS, GRACIAS POR SU COMPRENSIÓN.'
      );
      return false;
    }
    return true;
  }

  
  
  
  

  deleteAdolescent(id: number): void {
    const confirmDelete = confirm('¿Estás seguro de que deseas eliminar este adolescente?');
    if (confirmDelete) {
      this.adolescentService.deleteAdolescent(id).subscribe(() => {
        this.adolescentService.getAdolescentList().subscribe(data => {
        this.adolescents = data;
        this.toastServices.success('Programa eliminado exitosamente');
        });
      });
    }
    else{
      this.toastServices.error("No se pudo eliminar el programa");
    }
  }


  
  convertirFecha(fechaString: string): Date {
    
    const [day, month, year] = fechaString.split('-').map(Number);
    
    return new Date(year, month - 1, day); // El mes en JavaScript es 0-indexado
    
  }


  convertirFechaParaBackend(fechaString: string): string {
    if (!fechaString) {
      return '';  // o manejarlo según tu lógica
    }
  
    const [day, month, year] = fechaString.split('/').map(Number);
    return `${day}-${month}-${year}`;
  }
  

restoreAdolescent(id: number): void {
  const confirmRestore = confirm('¿Estás seguro de que deseas restaurar este adolescente?');
  if (confirmRestore) {
    this.adolescentService.restoreAdolescent(id).subscribe(() => {
      // Verificar si el adolescente ha sido restaurado correctamente
      this.isAdolescentRestored(id);
    });
  } else {
    this.toastServices.error('No se pudo restaurar el programa');
  }
}

// Función para verificar si un adolescente con el ID proporcionado ha sido restaurado
isAdolescentRestored(id: number): void {
  this.adolescentService.getAdolescentList().subscribe(restoredAdolescents => {
    // Verificar si el ID está presente en la lista de adolescentes restaurados
    const isRestored = restoredAdolescents.some(adolescent => adolescent.id === id);
    if (isRestored) {
      this.toastServices.success('Programa restaurado exitosamente');
      this.loadAdolescents(); // Vuelve a cargar la lista después de restaurar
    } else {
      this.toastServices.error('No se pudo restaurar el programa. La fecha final no es mayor a la fecha actual.');
    }
  });
}




  filterAdolescentsByStatus(): void {
    if (this.filterByStatus === 'A') {
      this.filteredAdolescents = this.adolescents.filter(adolescent => adolescent.active === 'yes');
      this.isDeleteButton = true; // Cuando se filtra por Activos, el botón debe ser "Eliminar"
    } else if (this.filterByStatus === 'I') {
      this.filteredAdolescents = this.adolescents.filter(adolescent => adolescent.active === 'no');
      this.isDeleteButton = false; // Cuando se filtra por Inactivos, el botón debe ser "Restaurar"
    }
    this.loadAdolescents();
  }



  filterAdolescentsByName(): void {
    console.log('Filtrando por nombre:', this.nameFilter);
  
    if (this.nameFilter) {
      this.filteredAdolescents = this.adolescents.filter(adolescent =>
        adolescent.name.toLowerCase().includes(this.nameFilter.toLowerCase())
      );
    } else {
      // If the name filter is empty, reset the list to the original state
      this.filteredAdolescents = this.adolescents.slice();
    }
  }

  filterAdolescentsByLevel(): void {
    console.log('Filtrando por nivel:', this.levelFilter);
  
    if (this.levelFilter) {
      this.filteredAdolescents = this.adolescents.filter(adolescent =>
        adolescent.level.toLowerCase() === this.levelFilter.toLowerCase()
      );
    } else {
      // Si el filtro de nivel está vacío, resetea la lista al estado original
      this.filteredAdolescents = this.adolescents.slice();
    }
  }

  openModal(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '400px',
      data: {
        // Otras propiedades que necesitas pasar
        adolescents: this
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('Modal closed with result:', result);
    });
  }
  
  



}


