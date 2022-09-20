import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { EventosComponent } from './Components/eventos/eventos.component';
import {HttpClientModule} from "@angular/common/http";
import { SalasComponent } from './Components/salas/salas.component';
import {CustomComponentsModule} from "./modules/custom-components/custom-components.module";

@NgModule({
  declarations: [
  ],
  imports: [HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    CustomComponentsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
