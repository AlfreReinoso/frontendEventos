import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Cliente} from "../model/cliente";
import {HttpClient} from "@angular/common/http";
import {API_URL} from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private http:HttpClient) { }

  getClientes(){
    return this.http.get(`${API_URL}/clientes/findClientes`);
  }
  getCliente(nameUsuario: string): Observable<Cliente>{
    return this.http.get<Cliente>(`${API_URL}/clientes/findCliente/${nameUsuario}`);
  }

}
