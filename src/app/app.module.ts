import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { EventosComponent } from './Components/eventos/eventos.component';
import {HttpClientModule} from "@angular/common/http";
import { SalasComponent } from './Components/salas/salas.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    EventosComponent,
    SalasComponent,

  ],
  imports: [HttpClientModule,
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
