import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SalasComponent} from "./Components/salas/salas.component";
import {SalonComponentComponent} from "./Components/salon-component/salon-component.component";
import {NavbarComponent} from "./Components/navbar/navbar.component";

const routes: Routes = [
  {path:'salas', component: SalasComponent},
  {path:'salon/:id',component:SalonComponentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
