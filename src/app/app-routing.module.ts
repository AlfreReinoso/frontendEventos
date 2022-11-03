import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalasComponent } from "./Components/salas/salas.component";
import { SalonComponent } from './Components/salon/salon.component';

import { ServiciosFormComponent } from './Components/servicios/servicios-form/servicios-form.component';
import { ServiciosComponent } from './Components/servicios/servicios.component';
import {EventosComponent} from "./Components/eventos/eventos.component";

const routes: Routes = [
  {path:'salas', component: SalasComponent},
  {path:'salon/:id',component:SalonComponent},
  {path:'servicios',component:ServiciosComponent},
  {path:'servicios/:id',component:ServiciosComponent},
{path:'serviciosForm', component:ServiciosFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
