import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { HttpIntercepterBasicAuthService } from "./Services/service/http-authenticate.service";
import { environment } from "../environments/environment";
// import { ServicioState } from './State/servicio.state';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { NgxsModule } from '@ngxs/store';
import { Location } from '@angular/common';
import { CustomComponentsModule } from './modules/custom-components/custom-components.module';
import {CardModule} from "primeng/card";
import {ReactiveFormsModule} from "@angular/forms";
import {InputNumberModule} from "primeng/inputnumber";
import {DropdownModule} from "primeng/dropdown";
import {RippleModule} from "primeng/ripple";
import {ButtonModule} from "primeng/button";
import {EventosState} from "./State/evento.state";
import {AdministrativoState} from "./State/adm.state";
import {ClienteState} from "./State/cliente.state";

@NgModule({
  declarations: [AppComponent],
  imports: [
    CustomComponentsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    InputNumberModule,
    DropdownModule,
    RippleModule,
    CardModule,
    ButtonModule,
    // NgxsModule.forRoot([ServicioState], {
    //   developmentMode: !environment.production
    // }),
    NgxsModule.forRoot([EventosState, ClienteState, AdministrativoState], {
      developmentMode: !environment.production
    }),
    // NgxsModule.forRoot([AdministrativoState], {
    //   developmentMode: !environment.production
    // }),
    // NgxsModule.forRoot([ClienteState], {
    //   developmentMode: !environment.production
    // }),
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:HttpIntercepterBasicAuthService, multi:true},
    Location,
    MessageService,
    DialogService,
    DynamicDialogRef,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
