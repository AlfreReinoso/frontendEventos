import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Servicio } from "../model/servicio";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  constructor(private http: HttpClient) { }

  saveServicio(servicio: Servicio): Observable<Servicio> {
    return this.http.post<Servicio>("http://localhost:8080/servicio/save", servicio);
  }

  update(servicio: Servicio): Observable<Servicio> {
    return this.http.put<Servicio>("http://localhost:8080/servicio/update", servicio);
  }

  delete(servicio: Servicio): Observable<Servicio> {
    return this.http.post<Servicio>("http://localhost:8080/servicio/delete", servicio);
  }

  findAll(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>("http://localhost:8080/servicio/findAll");
  }
}
