import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Store} from "@ngxs/store";
import {ClienteState} from "./State/cliente.state";
import {AdministrativoState} from "./State/adm.state";
import {Administrativo} from "./model/administrativo";
import {Cliente} from "./model/cliente";
import {BasicJWTAuthServicesService} from "./Services/basic-jwtauth-services.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{

  title = 'Eventos';

  administrativo: Administrativo ;
  cliente: Cliente ;


  constructor(    private store:Store,    private _basicJwtAuthServices: BasicJWTAuthServicesService) { }


  async ngOnInit(): Promise<void> {
    await new Promise(r => setTimeout(r, 500));

    this.cliente = this.store.selectSnapshot(ClienteState.getCliente);
    this.administrativo = this.store.selectSnapshot(AdministrativoState.getAdministrativo);
  }

  ngOnDestroy(): void {
    this._basicJwtAuthServices.logout();
  }
}
