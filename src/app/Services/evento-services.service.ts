import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Evento} from "../model/evento";
import {Observable} from "rxjs";
import {Cliente} from "../model/cliente";
import {API_URL} from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class EventoServicesService {

  constructor(private http: HttpClient) { }

  getDataEventos(){
    return this.http.get(`${API_URL}/eventos/findEventos`);
  }

  getDataEventosForCliente(cliente:Cliente):Observable<Evento[]>{
    return this.http.get<Evento[]>(`${API_URL}/eventos/findEventos/cliente/${cliente.idUsuario}`)
  }
  updateEventos(evento: Evento): Observable<Evento>{
    return this.http.put<Evento>(`${API_URL}/eventos/putEventos`, evento);
  }

  deleteEventos(id: number){
    return this.http.delete<Evento>(`${API_URL}/eventos/deleteEventos/${id}`);
  }

  insertEvento(evento:Evento):Observable<Evento>{
    return this.http.post<Evento>(`${API_URL}/eventos`, evento);
  }

}
