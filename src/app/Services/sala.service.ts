import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Salon} from "../model/salon";
import {Observable} from "rxjs";
import {API_URL} from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class SalaService {

  constructor(private http: HttpClient) { }

  getSalas(): any {
    return this.http.get<Salon[]>(`${API_URL}/salas/findSalas`);
  }
  getSalon(id: number): any {
    return this.http.get<Salon>(`${API_URL}/salas/${id}`);
  }
  updateSalon(salon: Salon): any {
    return this.http.put<Salon>(`${API_URL}/salas/update`, salon);
  }
  createSalon(salon: Salon): any {
    return this.http.post<Salon>(`${API_URL}/salas/savesalon`, salon);
  }
  deleteSalon(id:number){
    return this.http.delete<Salon>(`${API_URL}/salas/delete/${id}`);
  }
}
