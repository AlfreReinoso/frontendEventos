import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalasComponent } from "./Components/salas/salas.component";
import { SalonComponent } from './Components/salon/salon.component';

import { ServiciosFormComponent } from './Components/servicios/servicios-form/servicios-form.component';
import { ServiciosComponent } from './Components/servicios/servicios.component';
import {EventosComponent} from "./Components/eventos/eventos.component";
import {EventoFormComponent} from "./Components/evento-form/evento-form.component";
import {RouteGuardService} from "./Services/route-guard.service";

const routes: Routes = [
  {path:'salas', component: SalasComponent, canActivate:[RouteGuardService]},
  {path:'salon/:id',component:SalonComponent, canActivate:[RouteGuardService]},
  {path:'servicios',component:ServiciosComponent, canActivate:[RouteGuardService]},
  {path:'servicios/:id',component:ServiciosComponent, canActivate:[RouteGuardService]},
{path:'serviciosForm', component:ServiciosFormComponent, canActivate:[RouteGuardService]},
  {path:'eventos', component:EventosComponent, canActivate:[RouteGuardService]},
  {path:'eventoForm', component:EventoFormComponent, canActivate:[RouteGuardService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
