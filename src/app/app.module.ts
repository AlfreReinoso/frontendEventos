import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { HttpIntercepterBasicAuthService } from "./Services/service/http-authenticate.service";

import { environment } from "../environments/environment";
import { ServicioState } from './State/servicio.state';

import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { NgxsModule } from '@ngxs/store';
import { Location } from '@angular/common';
import { CustomComponentsModule } from './modules/custom-components/custom-components.module';
import { EventoFormComponent } from './Components/eventos/evento-form/evento-form.component';
import {CardModule} from "primeng/card";
import {ReactiveFormsModule} from "@angular/forms";
import {InputNumberModule} from "primeng/inputnumber";
import {DropdownModule} from "primeng/dropdown";
import {RippleModule} from "primeng/ripple";
import {ButtonModule} from "primeng/button";

@NgModule({

  declarations: [AppComponent],
  imports: [
    CustomComponentsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,

    NgxsModule.forRoot([ServicioState], {
      developmentMode: !environment.production
    }),
    CardModule,
    ReactiveFormsModule,
    InputNumberModule,
    DropdownModule,
    RippleModule,
    ButtonModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:HttpIntercepterBasicAuthService, multi:true},
    Location,
    MessageService,
    DialogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
