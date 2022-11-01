import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalasComponent } from "./Components/salas/salas.component";
import { SalonComponentComponent } from "./Components/salon-component/salon-component.component";
import { ServiciosFormComponent } from './Components/servicios/servicios-form/servicios-form.component';
import { ServiciosComponent } from './Components/servicios/servicios.component';

const routes: Routes = [
  {path:'salas', component: SalasComponent},
  {path:'salon/:id',component:SalonComponentComponent},
  {path:'servicios/:id',component:ServiciosComponent},
  {path:'serviciosForm/:id', component:ServiciosFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
