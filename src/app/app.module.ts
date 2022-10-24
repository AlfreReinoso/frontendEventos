import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {CustomComponentsModule} from "./modules/custom-components/custom-components.module";
import {HttpIntercepterBasicAuthService} from "./Services/service/http-authenticate.service";
import {LoginComponent} from "./Components/login/login.component";
import {SalasComponent} from "./Components/salas/salas.component";
import { SalonComponentComponent } from './Components/salon-component/salon-component.component';
import {CardModule} from "primeng/card";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";

@NgModule({
  declarations: [

    SalonComponentComponent
  ],
  imports: [HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    CustomComponentsModule, CardModule, InputTextModule, FormsModule, ButtonModule,
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:HttpIntercepterBasicAuthService, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
