import { Component, OnInit } from '@angular/core';
import {MenuItem} from "primeng/api";
import {BasicJWTAuthServicesService} from "../../Services/basic-jwtauth-services.service";
import {Router} from "@angular/router";
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public loginDialog?: DynamicDialogRef;

  username: string = '';
  password: string = '';

  items: MenuItem[] = [];

  showLogin:boolean = true;
  showLogOut: boolean = false;


  invalidLogin: boolean = false;
  message: string = 'Error en username / password'

  constructor(private _basicJwtAuthServices: BasicJWTAuthServicesService, private router: Router, private _dialogService: DialogService) { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Inicio',
        icon: 'pi pi-home'
      },
      {
        label: 'Eventos',
        items: [
          { label: 'Ver eventos', icon:'pi pi-list' },
          { label: 'Nuevo evento', icon:'pi pi-plus-circle' }
          ]
      },
      {
      label: 'Salones',
      items: [
        { label: 'Ver salones', icon:'pi pi-list', routerLink:'salas' },
        { label: 'Nuevo salón', icon:'pi pi-plus-circle' }
        ]
      },
      {
        label: 'Servicios',
        items: [
          { label: 'Ver servicios', icon:'pi pi-list', routerLink:'servicios' },
          { label: 'Nuevo servicio', icon:'pi pi-plus-circle', routerLink:'serviciosForm' },
        ]
      },
      {
        label: 'Tipos de servicio',
        items: [
          { label: 'Ver tipos', icon:'pi pi-list' },
          { label: 'Nuevo tipo', icon:'pi pi-plus-circle' }
          ]
      }
    ];

    if(this._basicJwtAuthServices.getAuthenticatedUser()){
      this.invalidLogin = false;
      this.showLogin= false;
      this.showLogOut = true;
    }
  }


  displayLogin(){
    console.log('funciona el display');
    this.showLogin = false;
    this.showLogOut = true;
    this.loginDialog = this._dialogService.open(LoginComponent, {
      header: 'Ingresar',
      width: '18rem',
    });
  }

  setShowFalse() {
    this._basicJwtAuthServices.logout();
    this.showLogOut = false;
    this.showLogin = true;
    this.router.navigate(['']);
  }

  handleJWTAuthLogin() {
    this._basicJwtAuthServices.executeJWTAuthenticationService(this.username, this.password)
      .subscribe(
        (data: any) => {

          this.invalidLogin = false;
          this.showLogin = false;
          this.showLogOut = true;
          this.router.navigate(['salas']);

        },
        (error: any) => {
          // console.log(error);
          this.invalidLogin = true;
        }
      );
  }
}
