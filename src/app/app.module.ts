import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {CustomComponentsModule} from "./modules/custom-components/custom-components.module";
import {HttpIntercepterBasicAuthService} from "./Services/service/http-authenticate.service";
import {LoginComponent} from "./Components/login/login.component";
import {SalasComponent} from "./Components/salas/salas.component";

@NgModule({
  declarations: [
  ],
  imports: [HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    CustomComponentsModule,
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:HttpIntercepterBasicAuthService, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
