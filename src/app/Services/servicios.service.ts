import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Servicio } from "../model/servicio";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  constructor(private http: HttpClient) { }

  saveServicio(servicio: Servicio): Observable<Servicio>{
    return this.http.post<Servicio>("http://localhost:8080/servicio/save", servicio);
  }

  findAll(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>("http://localhost:8080/servicio/findAll");
  }
}
