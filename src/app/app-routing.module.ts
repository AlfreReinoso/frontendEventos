import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SalasComponent} from "./Components/salas/salas.component";
import {SalonComponentComponent} from "./Components/salon-component/salon-component.component";
import {NavbarComponent} from "./Components/navbar/navbar.component";
import {ServiciosComponent} from "./servicios/servicios.component";
import {ServicioComponentComponent} from "./servicio-component/servicio-component.component";

const routes: Routes = [
  {path:'salas', component: SalasComponent},
  {path:'salon/:id',component:SalonComponentComponent},
  {path:'servicios/:id',component:ServiciosComponent},
  {path:'servicio/:id_salon',component:ServicioComponentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
