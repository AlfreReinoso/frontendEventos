import {Component, Input} from '@angular/core';
import { BasicJWTAuthServicesService } from "../../Services/basic-jwtauth-services.service";
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import {Router} from "@angular/router";
import {AddCliente} from "../../State/cliente.state";
import {AddAdministrativo, AdministrativoState} from "../../State/adm.state";
import {ClientesService} from "../../Services/clientes.service";
import {AdministrativoService} from "../../Services/administrativo.service";
import {Store} from "@ngxs/store";
import {AddMenu} from "../../State/menu.state";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  @Input() islogeado: boolean;
  username: string = '';
  password: string = '';

  constructor(
    private store:Store,
    private basicAuthenticationServices: BasicJWTAuthServicesService,
    private _messageService: MessageService,
    public loginDialog: DynamicDialogRef,
    private router: Router,
    private _clienteService: ClientesService,
    private _administrativoService: AdministrativoService
    ) { }

  handleJWTAuthLogin(){
    this.basicAuthenticationServices.executeJWTAuthenticationService(this.username, this.password)
      .subscribe(
          (data: any) => {
            // this._clienteService.getCliente(this.username).subscribe(
            //   (response)=>{
            //     console.log(response)
            //     if(response){
            //       this.store.dispatch(new AddCliente(response))
            //       // this.store.dispatch(new AddMenu())
            //     }
            //   }
            // );
            // this._administrativoService.getAdministrativo(this.username).subscribe(
            //   (response)=>{
            //     console.log(response)
            //     if(response){
            //       this.store.dispatch(new AddAdministrativo(response))
            //       console.log(this.store.selectSnapshot(AdministrativoState.getAdministrativo))
            //     }
            //   }
            // )

            this.islogeado = true;
            this.router.navigate(['/salas']);

        },
        (error: any) => {
          this.mensajeError();
          this.islogeado= false
        }
      );
  }

  mensajeError() {
    this._messageService.clear();
    this._messageService.add({ severity:'error', summary: 'Error', detail: 'Usuario o Contraseña incorrecta' });
  }
}
