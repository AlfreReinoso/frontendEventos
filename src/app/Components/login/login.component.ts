import { Component } from '@angular/core';
import { BasicJWTAuthServicesService } from "../../Services/basic-jwtauth-services.service";
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = '';
  password: string = '';

  constructor(
    private basicAuthenticationServices: BasicJWTAuthServicesService,
    private _messageService: MessageService,
    public loginDialog: DynamicDialogRef,
    private router: Router,
    ) { }

  handleJWTAuthLogin(){
    this.basicAuthenticationServices.executeJWTAuthenticationService(this.username, this.password)
      .subscribe(
          (data: any) => {
          this.loginDialog.close(true);
          this.router.navigate(['/salas']);
        },
        (error: any) => {
          this.mensajeError();
        }
      );
  }

  mensajeError() {
    this._messageService.clear();
    this._messageService.add({ severity:'error', summary: 'Error', detail: 'Usuario o Contraseña incorrecta' });
  }
}
