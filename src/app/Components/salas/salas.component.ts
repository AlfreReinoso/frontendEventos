import {Component, OnDestroy, OnInit} from '@angular/core';
import { Salon } from '../../model/salon';
import { SalaService } from '../../Services/sala.service';
import {AUTHENTICATED_USER, BasicJWTAuthServicesService} from "../../Services/basic-jwtauth-services.service";
import { Router } from "@angular/router";
import {Cliente} from "../../model/cliente";
import {Administrativo} from "../../model/administrativo";
import {ClienteState} from "../../State/cliente.state";
import {AdministrativoState} from "../../State/adm.state";
import {Select, Selector, Store} from "@ngxs/store";
import {Observable} from "rxjs";

@Component({
  selector: 'app-salas',
  templateUrl: './salas.component.html',
  styleUrls: ['./salas.component.css']
})
export class SalasComponent implements OnInit , OnDestroy{

  @Select(AdministrativoState.getAdministrativo)isAdministrativo$:Observable<Administrativo>;


  salas: Salon[] = [];
  cliente: Cliente;
  administrativo:Administrativo;

  showButtonNew: boolean = false;

  constructor(
    private salaservice: SalaService,
    private router:Router,
    ) { }

  ngOnInit(): void {
    this.isAdministrativo$.subscribe((adm)=>{
      if(adm){
        this.showButtonNew = adm.idUsuario > 0;
      }
    });
    if(sessionStorage.getItem(AUTHENTICATED_USER)){
      this.salaservice.getSalas().subscribe(
        (response: Salon[]) => {
          this.salas = response;
        }
      )
    }
  }

  selectSalon(idSala: number) : void{
    this.router.navigate(['/salon',idSala]);
  }

  ngOnDestroy() {
    this.salas=[];
  }
}
