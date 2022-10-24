import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import {PrimeNgModule} from "../prime-ng/prime-ng.module";
import {AppComponent} from "../../app.component";
import {NavbarComponent} from "../../Components/navbar/navbar.component";
import {EventosComponent} from "../../Components/eventos/eventos.component";
import {SalasComponent} from "../../Components/salas/salas.component";
import {CardModule} from "primeng/card";
import {RouterModule} from "@angular/router";
import {ButtonModule} from "primeng/button";
import {LoginComponent} from "../../Components/login/login.component";
import {MenubarModule} from "primeng/menubar";
import {DialogModule} from "primeng/dialog";
import {FormsModule} from "@angular/forms";
import {DataViewModule} from "primeng/dataview";
import {TableModule} from "primeng/table";
import {InputTextModule} from "primeng/inputtext";
import {PasswordModule} from "primeng/password";


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    EventosComponent,
    SalasComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    CardModule,
    RouterModule,
    ButtonModule,
    MenubarModule,
    DialogModule,
    BrowserAnimationsModule,
    FormsModule,
    DataViewModule,
    TableModule,
    InputTextModule,
    PasswordModule,
  ],
  exports:[
    AppComponent,
    NavbarComponent,
    EventosComponent,
    SalasComponent,
    LoginComponent,
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CustomComponentsModule { }
