import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import { MenuItem } from "primeng/api";
import { BasicJWTAuthServicesService } from "../../Services/basic-jwtauth-services.service";
import { Router } from "@angular/router";
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LoginComponent } from '../login/login.component';
import {Select, Store} from "@ngxs/store";
import {AdministrativoState, AdmResetAction} from "../../State/adm.state";
import {Administrativo} from "../../model/administrativo";
import {Cliente} from "../../model/cliente";
import {ClienteResetAction, ClienteState} from "../../State/cliente.state";
import {Observable} from "rxjs";
import {MenuState} from "../../State/menu.state";
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {


  isUserLoggedIn: boolean = false;
  showLogin: boolean = false;
  items: MenuItem[] = [];

  administrativo: Administrativo ;
  cliente: Cliente ;

  constructor(
    private router: Router,
    private _basicJwtAuthServices: BasicJWTAuthServicesService,
    private _dialogService: DialogService,
    private store:Store,
    ) { }


  ngOnInit() {
    this.logIn();
  }

  ngOnDestroy() {
    this.logOut();
  }

  logIn(){

      this.verificarElUserState();
      if(this.cliente || this.administrativo){
        if(this.cliente.idUsuario != 0|| this.administrativo.idUsuario!=0){
          this.isUserLoggedIn = true;
        }else{
          this.isUserLoggedIn = false;
          this.showLogin = true;
        }
         if (this.isUserLoggedIn) {
           // this.setearMenu(true) 
  
           this.showMenu(true,'');
         } else {
           this.showMenu(false,'');
         }
      }
      
  }

   verificarElUserState() {
      this.cliente = this.store.selectSnapshot(ClienteState.getCliente);
      this.administrativo = this.store.selectSnapshot(AdministrativoState.getAdministrativo);
  }

  async setearMenu(usuario:Usuario){
    // await new Promise(r => setTimeout(r, 1500));
    if(usuario != null){
      this.isUserLoggedIn = true
      this.cliente = this.store.selectSnapshot(ClienteState.getCliente);
      this.administrativo = this.store.selectSnapshot(AdministrativoState.getAdministrativo);

      if (this.isUserLoggedIn) {
        this.showMenu(true, usuario.tipoUsuario);
      } else {
        this.isUserLoggedIn = false;
        this.showMenu(false, '');
      }
    }
  }

  logOut() {
    this.showLogin = false;
    this._basicJwtAuthServices.logout();
    this.isUserLoggedIn = false;
    this.cliente = new Cliente();
    this.administrativo = new Administrativo();
    this.showMenu(false,'');
    this.router.navigate(['']);
  }

  showMenu(b: Boolean, tipoUsuario:String) {
    if (b) {
      if(tipoUsuario == 'ADMINISTRATIVO'){
        this.items = [
          {
            label: 'Inicio',
            icon: 'pi pi-home',
            routerLink:'salas'
          },
          {
            label: 'Eventos',
            items: [
              { label: 'Ver eventos', icon:'pi pi-list', routerLink: 'eventos' },
              { label: 'Nuevo evento', icon:'pi pi-plus-circle',routerLink: 'eventoForm' }
            ]
          },
          {
            label: 'Salones',
            items: [

              { label: 'Ver salones', icon:'pi pi-list', routerLink:'salas' },
              { label: 'Nuevo salón', icon:'pi pi-plus-circle', routerLink: ['/salon',0] }
            ]
          },
          {
            label: 'Servicios',
            items: [
              { label: 'Ver servicios', icon:'pi pi-list', routerLink:['/servicios'] },
              { label: 'Nuevo servicio', icon:'pi pi-plus-circle', routerLink:['/serviciosForm'] },
            ]
          },
          {
            label: 'Tipos de servicio',
            items: [
              { label: 'Ver tipos', icon:'pi pi-list', routerLink:['/tipoServicio'] },
              { label: 'Nuevo tipo', icon:'pi pi-plus-circle', routerLink:['/tipoServicioForm'] }
            ]
          }
        ];
        this.router.navigate(['/salas']);

      } else if(tipoUsuario == 'CLIENTE'){
          this.items = [
            {
              label: 'Inicio',
              icon: 'pi pi-home',
              routerLink:'salas'
            },{
              label: 'Eventos',
              routerLink: 'eventos'
            },{
              label: 'Salones',
              routerLink:'salas'
            },{
              label: 'Servicios',
              routerLink:['/servicios']
              
            }
          ]
          this.router.navigate(['/salas']);
      }

    } else {
      this.items = [];
      this.router.navigate(['']);

    }

  }
}
