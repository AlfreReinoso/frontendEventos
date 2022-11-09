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
import { EventoFormComponent } from './Components/evento-form/evento-form.component';

@NgModule({

  declarations: [AppComponent, EventoFormComponent],
  imports: [
    CustomComponentsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,

    NgxsModule.forRoot([ServicioState], {
      developmentMode: !environment.production
    })
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:HttpIntercepterBasicAuthService, multi:true},
    MessageService,
    DialogService,
    Location
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
