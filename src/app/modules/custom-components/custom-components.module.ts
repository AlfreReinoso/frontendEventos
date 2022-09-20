import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {PrimeNgModule} from "../prime-ng/prime-ng.module";
import {AppComponent} from "../../app.component";
import {NavbarComponent} from "../../Components/navbar/navbar.component";
import {EventosComponent} from "../../Components/eventos/eventos.component";
import {SalasComponent} from "../../Components/salas/salas.component";
import {CardModule} from "primeng/card";
import {RouterModule} from "@angular/router";
import {ButtonModule} from "primeng/button";


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    EventosComponent,
    SalasComponent,
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    CardModule,
    RouterModule,
    ButtonModule,
  ],
  exports:[
    AppComponent,
    NavbarComponent,
    EventosComponent,
    SalasComponent,
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CustomComponentsModule { }
