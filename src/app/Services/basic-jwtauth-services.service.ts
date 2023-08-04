import { Injectable } from '@angular/core';
import {API_URL} from '../app.constants';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";
import {Store} from "@ngxs/store";
import {ClienteResetAction} from "../State/cliente.state";
import { AdmResetAction} from "../State/adm.state";
import { EventoResetAction } from '../State/evento.state';
export const TOKEN = 'token';
export const AUTHENTICATED_USER = 'authenticateUser';

@Injectable({
  providedIn: 'root'
})
export class
BasicJWTAuthServicesService {

  constructor(private http: HttpClient, private store:Store,
              ) { }

  executeJWTAuthenticationService(username: string, password: string) {
    return this.http.post<any>
    (`${API_URL}/authenticate`, {username, password}).pipe(
      map(
        data => {
          sessionStorage.setItem(AUTHENTICATED_USER, username);
          sessionStorage.setItem(TOKEN, `Bearer ${data.token}`);
          return data
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

    // console.log(this.store.selectSnapshot(ClienteState.getCliente))
    // console.log(this.store.selectSnapshot(AdministrativoState.getAdministrativo))

  }
}
