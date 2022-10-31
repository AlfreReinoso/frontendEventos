import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Servicio} from "../model/servicio";

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  constructor(private http : HttpClient) { }

  getServicios(): any {
    return this.http.get<Servicio[]>("http://localhost:8080/servicio/findAll");
  }
}
