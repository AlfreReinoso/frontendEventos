import {Component, EventEmitter, Input, Output} from '@angular/core';
import { BasicJWTAuthServicesService } from "../../Services/basic-jwtauth-services.service";
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import {Router} from "@angular/router";
import {ClientesService} from "../../Services/clientes.service";
import {AdministrativoService} from "../../Services/administrativo.service";
import {Store} from "@ngxs/store";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  @Input() islogeado: boolean;
  @Output() estaLogeado = new EventEmitter<boolean>();

  username: string = '';
  password: string = '';

  constructor(
    private store:Store,
    private basicAuthenticationServices: BasicJWTAuthServicesService,
    private _messageService: MessageService,
    public loginDialog: DynamicDialogRef,
    private router: Router,
    ) { }

  handleJWTAuthLogin(){
    this.basicAuthenticationServices.executeJWTAuthenticationService(this.username, this.password)
      .subscribe(
          (data: any) => {
            // console.log(data)
            this.islogeado = true;
            this.estaLogeado.emit(true)
            this.router.navigate(['/salas']);
        },
        (error: any) => {
          this.mensajeError();
          this.islogeado= false
          this.estaLogeado.emit(false)
        }
      );
  }

  mensajeError() {
    this._messageService.clear();
    this._messageService.add({ severity:'error', summary: 'Error', detail: 'Usuario o Contraseña incorrecta' });
  }
}
