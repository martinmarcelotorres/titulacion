import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlertsComponent } from './components/alerts/alerts.component';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { ChipsComponent } from './components/chips/chips.component';
import { ExpansionComponent } from './components/expansion/expansion.component';
import { FormsComponent } from './components/forms/forms.component';
import { GridListComponent } from './components/grid-list/grid-list.component';
import { MenuComponent } from './components/menu/menu.component';
import { ProgressSnipperComponent } from './components/progress-snipper/progress-snipper.component';
import { ProgressComponent } from './components/progress/progress.component';
import { SlideToggleComponent } from './components/slide-toggle/slide-toggle.component';
import { SliderComponent } from './components/slider/slider.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { TooltipsComponent } from './components/tooltips/tooltips.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FullComponent } from './layouts/full/full.component';
import { TeenPrincipalComponent } from './components/teen/operationalunit-principal/teen-principal.component';
import { TeenFormComponent } from "./components/teen/operationalunit-form/teen-form.component";
import {
  AsignationPrincipalComponent
} from "./components/asignation/asignation-principal/asignation-principal.component";
import { AsignationFormComponent } from "./components/asignation/asignation-form/asignation-form.component";
import {
  FuncionaryPrincipalComponent
} from "./components/funcionary/funcionary-principal/funcionary-principal.component";
import { FuncionaryFormComponent } from './components/funcionary/funcionary-form/funcionary-form.component';
import { OperationalunitPrincipalComponent } from './components/operationalunit/operationalunit-principal/operationalunit-principal.component';
import { OperationalunitFormComponent } from './components/operationalunit/operationalunit-form/operationalunit-form.component';
import { ProgramPrincipalComponent } from './components/program/program-principal/program-principal.component';
import { ProgramFormComponent } from './components/program/program-form/program-form.component';
import { UnitprogramPrincipalComponent } from './components/unitprogram/unitprogram-principal/unitprogram-principal.component';
import { UnitprogramFormComponent } from './components/unitprogram/unitprogram-form/unitprogram-form.component';
import { AttendancePrincipalComponent } from './components/attendance/attendance-principal/attendance-principal.component';
import { permisosGuard } from './components/guardar/permisos.guard';
import { TransDistComponent } from './components/program/trans-dist/trans-dist.component';
import { AdolescentFormComponent } from './programs/adolescent-form/adolescent-form.component';

const routes: Routes = [
  {
    path: "",
    component: FullComponent,
    children: [
      { path: "", redirectTo: "home", pathMatch: "full" },
      { path: "home", component: DashboardComponent },
      { path: "alerts", component: AlertsComponent },
      { path: "asignation", component: AsignationPrincipalComponent },
      { path: "forms", component: FormsComponent },
      { path: "teen", component: TeenPrincipalComponent },
      { path: "grid-list", component: GridListComponent },
      { path: "menu", component: MenuComponent },
      { path: "tabs", component: TabsComponent },
      { path: "expansion", component: ExpansionComponent },
      { path: "chips", component: ChipsComponent },
      { path: "progress", component: ProgressComponent },
      { path: "toolbar", component: ToolbarComponent },
      { path: "progress-snipper", component: ProgressSnipperComponent },
      { path: "snackbar", component: SnackbarComponent },
      { path: "slider", component: SliderComponent },
      { path: "slide-toggle", component: SlideToggleComponent },
      { path: "tooltip", component: TooltipsComponent },
      { path: "button", component: ButtonsComponent },
      { path: "teen-form", component: TeenFormComponent },
      { path: "asignation-form", component: AsignationFormComponent },
      { path: "funcionary", component: FuncionaryPrincipalComponent },
      { path: "funcionary-form", component: FuncionaryFormComponent },
      { path: "operativeunit", component: OperationalunitPrincipalComponent },
      { path: "operativeunit-form", component: OperationalunitFormComponent },
      { path: "program", canActivate: [permisosGuard], component: ProgramPrincipalComponent },
      { path: "program-form", component: ProgramFormComponent },
      { path: "unitprogram", component: UnitprogramPrincipalComponent },
      { path: "unitprogram-form", component: UnitprogramFormComponent },
      { path: "attendance", component: AttendancePrincipalComponent },
      { path: "trans-dist", component: TransDistComponent },
      { path: "adolescent-form", component: AdolescentFormComponent },
    ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
