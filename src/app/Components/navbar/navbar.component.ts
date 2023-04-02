import {AfterViewInit, Component, OnInit} from '@angular/core';
import { MenuItem } from "primeng/api";
import { BasicJWTAuthServicesService } from "../../Services/basic-jwtauth-services.service";
import { Router } from "@angular/router";
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LoginComponent } from '../login/login.component';
import {Select, Store} from "@ngxs/store";
import {AdministrativoState} from "../../State/adm.state";
import {Administrativo} from "../../model/administrativo";
import {Cliente} from "../../model/cliente";
import {ClienteState} from "../../State/cliente.state";
import {Observable} from "rxjs";
import {MenuState} from "../../State/menu.state";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, AfterViewInit {

  // @Select(ClienteState.getCliente) isCliente$: Observable<Cliente>;
  // @Select(MenuState.getMenu) items$: Observable<MenuItem[]>;



  loginDialog: DynamicDialogRef;

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
    // this.items$.subscribe((menu)=>{console.log(menu);this.items = menu})
    this.logIn();


  }
  ngAfterViewInit(){
    console.log('estoy en el afterinit')


  }

   logIn(){
     this.showLogin = true;
     if (this.isUserLoggedIn) {
       this.setearMenu(true)

       this.showMenu(true);
     } else {
       this.showMenu(false);
     }
    // this.loginDialog = this._dialogService.open(LoginComponent, {
    //   header: 'Ingresar',
    //   width: '18rem',
    // });
    // this.loginDialog.onClose.subscribe(isUserLoggedIn => {
    //   if (isUserLoggedIn) {
    //     setTimeout(this.setearMenu(), 500)
    //     this.isUserLoggedIn = isUserLoggedIn;
    //     this.showMenu(true);
    //   } else {
    //     this.isUserLoggedIn = false;
    //     this.showMenu(false);
    //   }
    // })


  }
  async setearMenu(event:any):Promise<any>{
    await new Promise(r => setTimeout(r, 500));
    if(event == true){
      this.isUserLoggedIn = true
      this.cliente = this.store.selectSnapshot(ClienteState.getCliente);
      this.administrativo = this.store.selectSnapshot(AdministrativoState.getAdministrativo);

      if (this.isUserLoggedIn) {
        this.showMenu(true);
      } else {
        this.isUserLoggedIn = false;
        this.showMenu(false);
      }
    }

  }

  logOut() {
    this.showLogin = false;
    this._basicJwtAuthServices.logout();
    this.isUserLoggedIn = false;
    this.showMenu(false);
    this.router.navigate(['']);
  }

  showMenu(b: Boolean) {
    if (b) {
      if(this.administrativo != undefined){
        console.log('estoy dentro del if '+this.administrativo)
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
      } else if(this.cliente != undefined){
        console.log('estoy dentro del if '+this.cliente)
          this.items = [
            {
              label: 'Inicio',
              icon: 'pi pi-home',
              routerLink:'salas'
            },{
              label: 'Eventos',
              items: [
                { label: 'Ver eventos', icon:'pi pi-list', routerLink: 'eventos' },
              ]
            },{
              label: 'Salones',
              items: [

                { label: 'Ver salones', icon:'pi pi-list', routerLink:'salas' },
              ]
            },{
              label: 'Servicios',
              items: [
                { label: 'Ver servicios', icon:'pi pi-list', routerLink:['/servicios'] },
              ]
            },{
              label: 'Tipos de servicio',
              items: [
                { label: 'Ver tipos', icon:'pi pi-list', routerLink:['/tipoServicio'] },
              ]
            }
          ]
      }
    } else {
      this.items = [];
    }
  }
}
