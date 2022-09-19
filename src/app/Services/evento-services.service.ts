import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EventoServicesService {

  constructor(private http: HttpClient) { }

  getDataEventos(nombre: String){
    return this.http.get(`http://localhost:8080/helloworld/path-variable/${nombre}`);
    //console.log("Hello");
  }
}
