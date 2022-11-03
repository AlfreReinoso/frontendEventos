import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Evento} from "../model/evento";

@Injectable({
  providedIn: 'root'
})
export class EventoServicesService {

  constructor(private http: HttpClient) { }

  getDataEventos(){
    return this.http.get(`http://localhost:8080/eventos/findEventos`);
    //console.log("Hello");
  }
  updateEventos(evento: Evento){
    return this.http.put(`http://localhost:8080/eventos/putEventos`, evento);
  }
}
