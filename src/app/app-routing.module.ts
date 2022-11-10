import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './Authentication/authentication.guard';
import { LoginComponent } from './Components/login/login.component';
import { SalasComponent } from "./Components/salas/salas.component";
import { SalonComponent } from './Components/salon/salon.component';
import { ServiciosFormComponent } from './Components/servicios/servicios-form/servicios-form.component';
import { ServiciosComponent } from './Components/servicios/servicios.component';
import { TipoServicioFormComponent } from './Components/tipo-servicio/tipo-servicio-form/tipo-servicio-form.component';
import { TipoServicioComponent } from './Components/tipo-servicio/tipo-servicio.component';
import {EventosComponent} from "./Components/eventos/eventos.component";
import {EventoFormComponent} from "./Components/evento-form/evento-form.component";
import {RouteGuardService} from "./Services/route-guard.service";

const routes: Routes = [
  { path:'login', component: LoginComponent},
  { path:'salas', component: SalasComponent, canActivate:[AuthenticationGuard] },
  { path:'salon/:id',component:SalonComponent, canActivate:[AuthenticationGuard] },
  { path:'servicios',component:ServiciosComponent, canActivate:[AuthenticationGuard] },
  { path:'servicios/:id',component:ServiciosComponent, canActivate:[AuthenticationGuard] },
  { path:'serviciosForm', component:ServiciosFormComponent, canActivate:[AuthenticationGuard] },
  { path:'tipoServicio', component:TipoServicioComponent, canActivate:[AuthenticationGuard] },
  { path:'tipoServicioForm', component:TipoServicioFormComponent, canActivate:[AuthenticationGuard] },
  {path:'eventos', component:EventosComponent, canActivate:[RouteGuardService]},
  {path:'eventoForm', component:EventoFormComponent, canActivate:[RouteGuardService]},
  { path:'', component: LoginComponent},
  // { path: '**', component: SalasComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
