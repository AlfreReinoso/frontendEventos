import { Component, OnInit } from '@angular/core';
import {MenuItem} from "primeng/api";
import {BasicJWTAuthServicesService} from "../../Services/basic-jwtauth-services.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  username: string = '';
  password: string = '';

  items: MenuItem[] = [];

  showLogin:boolean = true;
  showLogOut: boolean = true;


  invalidLogin: boolean = false;
  message: string = 'Error en username / password'

  constructor(private _basicJwtAuthServices: BasicJWTAuthServicesService, private router: Router) { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Eventos',
        items: [{
          label: 'Ver',
          icon: 'pi pi-fw pi-plus',
          items: [
            {label: 'Tipos'},
            {label: 'Fechas'},
          ]
        },
          {label: 'Hola'},
          {label: 'Chau'}
        ]
      },
      {
        label: 'A',
        icon: 'pi pi-fw pi-pencil',
        items: [
          {label: 'Delete', icon: 'pi pi-fw pi-trash'},
          {label: 'Refresh', icon: 'pi pi-fw pi-refresh'}
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
