import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Evento} from "../model/evento";
import {Observable} from "rxjs";
import {Servicio} from "../model/servicio";

@Injectable({
  providedIn: 'root'
})
export class EventoServicesService {

  constructor(private http: HttpClient) { }

  getDataEventos(){
    return this.http.get(`http://localhost:8080/eventos/findEventos`);
    //console.log("Hello");
  }


  updateEventos(evento: Evento): Observable<Evento>{
    console.log("en el service", evento);
    return this.http.put<Evento>(`http://localhost:8080/eventos/putEventos`, evento);
  }
  deleteEventos(id: number){
    return this.http.delete<Evento>(`http://localhost:8080/eventos/deleteEventos/${id}`);
  }

}
