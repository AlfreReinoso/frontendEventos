import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

import { PrimeNgModule } from "../prime-ng/prime-ng.module";
import { NavbarComponent } from "../../Components/navbar/navbar.component";
import { EventosComponent } from "../../Components/eventos/eventos.component";
import { SalasComponent } from "../../Components/salas/salas.component";
import { CardModule } from "primeng/card";
import { RouterModule } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { LoginComponent } from "../../Components/login/login.component";
import { MenubarModule } from "primeng/menubar";
import { DialogModule } from "primeng/dialog";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DataViewModule } from "primeng/dataview";
import { TableModule } from "primeng/table";
import { InputTextModule } from "primeng/inputtext";
import { PasswordModule } from "primeng/password";
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { ServiciosComponent } from 'src/app/Components/servicios/servicios.component';
import { ServiciosFormComponent } from 'src/app/Components/servicios/servicios-form/servicios-form.component';
import { SalonComponent } from 'src/app/Components/salon/salon.component';
import { MenuComponent } from 'src/app/Components/menu/menu.component';


@NgModule({
  declarations: [
    EventosComponent,
    LoginComponent,
    MenuComponent,
    NavbarComponent,
    SalasComponent,
    SalonComponent,
    ServiciosComponent,
    ServiciosFormComponent,

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
  CardModule,
    InputTextModule,
    FormsModule,
    ButtonModule,
    ReactiveFormsModule,
    InputNumberModule,
    DropdownModule,
    MessagesModule,
    MessageModule,
    DynamicDialogModule,
    ToastModule,
    TableModule
  ],
  exports:[
    EventosComponent,
    LoginComponent,
    MenuComponent,
    NavbarComponent,
    SalasComponent,
    SalonComponent,
    ServiciosComponent,
    ServiciosFormComponent,
    ToastModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CustomComponentsModule { }