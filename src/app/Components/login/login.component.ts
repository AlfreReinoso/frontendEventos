import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BasicJWTAuthServicesService} from "../../Services/basic-jwtauth-services.service";
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';

  constructor(
    private basicAuthenticationServices: BasicJWTAuthServicesService,
    private _messageService: MessageService, 
    public loginDialog: DynamicDialogRef,
    ) { }

  ngOnInit(): void {
  }

  handleJWTAuthLogin(){
    this.basicAuthenticationServices.executeJWTAuthenticationService(this.username, this.password)
      .subscribe(
          (data: any) => {

          //   this.invalidLogin = false;
          //   this.showLogin = false;
          // console.log(this.showLogin);
          //this.isUserLoggedIn.emit(true);
          this.loginDialog.close(true);
         //this.router.navigate(['salas']).then(r => console.log(r));
          
        },
        (error: any) => {
          // console.log(error);
          this.mensajeError();
        }
      );
  }

  mensajeError() {
    this._messageService.clear();
    this._messageService.add({ severity:'error', summary: 'Error', detail: 'Usuario o Contraseña incorrecta' });
  }
}
