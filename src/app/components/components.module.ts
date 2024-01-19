import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertsComponent } from './alerts/alerts.component';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { FormsComponent } from './forms/forms.component';
import { DemoFlexyModule } from '../demo-flexy-module';
import { GridListComponent } from './grid-list/grid-list.component';
import { MenuComponent } from './menu/menu.component';
import { TabsComponent } from './tabs/tabs.component';
import { ExpansionComponent } from './expansion/expansion.component';
import { ChipsComponent } from './chips/chips.component';
import { ProgressComponent } from './progress/progress.component';
import { ReactiveFormsModule} from '@angular/forms';
import {FormsModule} from '@angular/forms';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ProgressSnipperComponent } from './progress-snipper/progress-snipper.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { SliderComponent } from './slider/slider.component';
import { SlideToggleComponent } from './slide-toggle/slide-toggle.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { TooltipsComponent } from './tooltips/tooltips.component';
import { TeenPrincipalComponent } from './teen/operationalunit-principal/teen-principal.component';
import { TeenFormComponent } from './teen/operationalunit-form/teen-form.component';
import { AsignationPrincipalComponent } from './asignation/asignation-principal/asignation-principal.component';
import { AsignationFormComponent } from './asignation/asignation-form/asignation-form.component';
import { FuncionaryPrincipalComponent } from './funcionary/funcionary-principal/funcionary-principal.component';
import { FuncionaryFormComponent } from './funcionary/funcionary-form/funcionary-form.component';
import { OperationalunitPrincipalComponent } from './operationalunit/operationalunit-principal/operationalunit-principal.component';
import { OperationalunitFormComponent } from './operationalunit/operationalunit-form/operationalunit-form.component';
import { ProgramPrincipalComponent } from './program/program-principal/program-principal.component';
import { ProgramFormComponent } from './program/program-form/program-form.component';
import { UnitprogramPrincipalComponent } from './unitprogram/unitprogram-principal/unitprogram-principal.component';
import { UnitprogramFormComponent } from './unitprogram/unitprogram-form/unitprogram-form.component';
import { AttendancePrincipalComponent } from './attendance/attendance-principal/attendance-principal.component';
import { AttendanceFormComponent } from './attendance/attendance-form/attendance-form.component'
import { TransDistComponent } from './program/trans-dist/trans-dist.component';
import { AdolescentFormComponent } from '../programs/adolescent-form/adolescent-form.component';
import { ActivitiesFormComponent } from './activities/activities-form/activities-form.component';
import { HistorialPrincipalComponent } from './historial/historial-principal/historial-principal.component';


@NgModule({
    imports: [
        CommonModule,
        FeatherModule.pick(allIcons),
        DemoFlexyModule,
        ButtonsComponent,
        SlideToggleComponent,
        SliderComponent,
        ToolbarComponent,
        ProgressSnipperComponent,
        SnackbarComponent,
        MenuComponent,
        TabsComponent,
        ExpansionComponent,
        ChipsComponent,
        ProgressComponent,
        FormsComponent,
        AlertsComponent,
        GridListComponent,
        TooltipsComponent,
        FormsModule,
        ReactiveFormsModule,
    ],
  exports: [
    AlertsComponent,
    FormsComponent,
    GridListComponent,
    MenuComponent,
    TabsComponent,
    ExpansionComponent,
    ChipsComponent,
    ProgressComponent,
    ToolbarComponent,
    ProgressSnipperComponent,
    SnackbarComponent,
    SliderComponent,
    SlideToggleComponent,
    ButtonsComponent,
  ],
  declarations: [
    TeenPrincipalComponent,
    TeenFormComponent,
    AsignationPrincipalComponent,
    AsignationFormComponent,
    FuncionaryPrincipalComponent,
    FuncionaryFormComponent,
    OperationalunitPrincipalComponent,
    OperationalunitFormComponent,
    ProgramPrincipalComponent,
    ProgramFormComponent,
    UnitprogramPrincipalComponent,
    UnitprogramFormComponent,
    AttendancePrincipalComponent,
    AttendanceFormComponent,
    TransDistComponent,
    AdolescentFormComponent,
    ActivitiesFormComponent,
    HistorialPrincipalComponent
  ]
})
export class ComponentsModule { }
