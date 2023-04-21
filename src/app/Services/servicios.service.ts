import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Servicio } from "../model/servicio";
import { Observable } from 'rxjs';
import {API_URL} from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  constructor(private http: HttpClient) { }

  saveServicio(servicio: Servicio): Observable<Servicio> {
    return this.http.post<Servicio>(`${API_URL}/servicio/save`, servicio);
  }

  update(servicio: Servicio): Observable<Servicio> {
    return this.http.put<Servicio>(`${API_URL}/servicio/update`, servicio);
  }

  delete(id: number): Observable<Servicio> {
    return this.http.delete<Servicio>(`${API_URL}/servicio/delete/${id}`);
  }

  findAll(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(`${API_URL}/servicio/findAll`);
  }
}
