import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SalasComponent} from "./Components/salas/salas.component";
import {LoginComponent} from "./Components/login/login.component";

const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'salas', component: SalasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
