import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HotToastService } from '@ngneat/hot-toast';
import { AdolescentService } from 'src/app/adolescent.service';


@Component({
  selector: 'app-adolescent-form',
  templateUrl: './adolescent-form.component.html',
  styleUrls: ['./adolescent-form.component.scss']
})
export class AdolescentFormComponent {
  form!: FormGroup;
  newAdolescent: any = {
    condition: 'A'
  };
 

  constructor(
    private adolescentService: AdolescentService, 
    private router: Router,
    private fb: FormBuilder,
    private toastServices: HotToastService) {

      this.form = this.fb.group({
        name: ['', [Validators.required, Validators.pattern(/^[^0-9]+$/)]],
        type: ['', [Validators.required, Validators.pattern(/^[^0-9]+$/)]],
        beneficiary: ['', [Validators.required, Validators.pattern(/^[^0-9]+$/)]],
        responsible: ['', [Validators.required, Validators.pattern(/^[^0-9]+$/)]],
        level: ['', [Validators.required, Validators.pattern(/^[^0-9]+$/)]],
        startDate: [null, Validators.required],
        endDate: [null, Validators.required],
      });
     }

    

   
  

  formatDate(dateString: string): string {
    const [day, month, year] = dateString.split('-');
    return `${year}-${month}-${day}`;
  }
  


  navigateToAdolescentList(): void {
    this.router.navigate(['/adolescent-list']);
  }

  submitForm() {
    // Validar que los campos no contengan números
    if (/\d/.test(this.newAdolescent.name) || /\d/.test(this.newAdolescent.type) ||
      /\d/.test(this.newAdolescent.beneficiary) || /\d/.test(this.newAdolescent.responsible) 
      || /\d/.test(this.newAdolescent.level)) {
      this.toastServices.error('LOS CAMPOS NOMBRE, TIPO, BENEFICIARIO Y RESPONSABLE NO DEBEN CONTENER NÚMEROS, GRACIAS POR SU COMPRENSIÓN.');
      return;
    }

    this.newAdolescent.startDate = this.formatDate(this.newAdolescent.startDate);
    this.newAdolescent.endDate = this.formatDate(this.newAdolescent.endDate);


    this.adolescentService.saveAdolescent(this.newAdolescent).subscribe(() => {
      this.newAdolescent = {
        condition: 'A'
      };
      this.toastServices.success('Programa creado exitosamente'); 
    });
  }
}
