import { Injectable } from '@angular/core';
import {API_URL} from '../app.constants';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";
import {ClientesService} from "./clientes.service";
import {Store} from "@ngxs/store";
import {AddCliente, ClienteResetAction, ClienteState} from "../State/cliente.state";
import {AdministrativoService} from "./administrativo.service";
import {AddAdministrativo, AdministrativoState, AdmResetAction} from "../State/adm.state";
import { EventoResetAction } from '../State/evento.state';
export const TOKEN = 'token';
export const AUTHENTICATED_USER = 'authenticateUser';

@Injectable({
  providedIn: 'root'
})
export class
BasicJWTAuthServicesService {

  constructor(private http: HttpClient, private _clienteService: ClientesService, private store:Store,
              private _administrativoService: AdministrativoService) { }

  executeJWTAuthenticationService(username: string, password: string) {
    return this.http.post<any>
    (`${API_URL}/authenticate`, {username, password}).pipe(
      map(
        data => {
          sessionStorage.setItem(AUTHENTICATED_USER, username);
          sessionStorage.setItem(TOKEN, `Bearer ${data.token}`);
          this._clienteService.getCliente(username).subscribe(
            (response)=>{
              if(response){
                this.store.dispatch(new AddCliente(response))
                this.store.dispatch(new AdmResetAction())
              }
            }
          );
          this._administrativoService.getAdministrativo(username).subscribe(
            (response)=>{
              if(response){
                this.store.dispatch(new AddAdministrativo(response))
                this.store.dispatch(new ClienteResetAction())
              }
            }
          )
          return data;
        }
      )
    );
  }

  getAuthenticatedUser() {
    return sessionStorage.getItem(AUTHENTICATED_USER);
  }

  getAuthenticatedToken() {
    if (sessionStorage.getItem(AUTHENTICATED_USER)) {
      return sessionStorage.getItem(TOKEN);
    }
    return null;
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(AUTHENTICATED_USER);
    return !(user === null)
  }

  logout() {
    sessionStorage.removeItem(AUTHENTICATED_USER);
    this.store.dispatch(new ClienteResetAction())
    this.store.dispatch(new AdmResetAction())
    this.store.dispatch(new EventoResetAction())

    console.log(this.store.selectSnapshot(ClienteState.getCliente))
    console.log(this.store.selectSnapshot(AdministrativoState.getAdministrativo))

  }
}
