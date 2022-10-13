import { Component, OnInit } from '@angular/core';
import {MenuItem} from "primeng/api";
import {BasicJWTAuthServicesService} from "../../Services/basic-jwtauth-services.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  items: MenuItem[] = [];

  show:boolean = true;

  constructor(private _basicJwtAuthServices: BasicJWTAuthServicesService) { }

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
  }


  displayLogin(){
    console.log('funciona el display');
    this.show = true;
  }

  setShowFalse() {
    this._basicJwtAuthServices.logout();
    this.show = false;
  }
}
