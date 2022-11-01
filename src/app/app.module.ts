import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { CustomComponentsModule } from "./modules/custom-components/custom-components.module";
import { HttpIntercepterBasicAuthService } from "./Services/service/http-authenticate.service";
import { CardModule } from "primeng/card";
import { InputTextModule } from "primeng/inputtext";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { NgxsModule } from "@ngxs/store";
import { environment } from "../environments/environment";
import { ServicioState } from './State/servicio.state';
import { InputNumberModule } from "primeng/inputnumber";
import { DropdownModule } from 'primeng/dropdown';
import { MessagesModule } from 'primeng/messages'
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [
  ],
  imports: [HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    CustomComponentsModule,
    CardModule,
    InputTextModule,
    FormsModule,
    ButtonModule,
    InputNumberModule,
    DropdownModule,
    MessagesModule,
    MessageModule,
    DynamicDialogModule,
    ToastModule,
    TableModule,
    NgxsModule.forRoot([ServicioState], {
      developmentMode: !environment.production
    })
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:HttpIntercepterBasicAuthService, multi:true},
    MessageService,
    DialogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
