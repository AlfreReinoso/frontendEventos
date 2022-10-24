import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Sala} from "../model/sala";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SalaService {

  constructor(private http: HttpClient) { }

  getSalas(): any {
    return this.http.get<Sala[]>("http://localhost:8080/salas/findSalas");
  }
  getSalon(id: number): any {
    return this.http.get<Sala>(`http://localhost:8080/salas/${id}`);
  }
  updateSalon(salon: Sala): any {
    return this.http.put<Sala>(`http://localhost:8080/salas/update`, salon);
  }
  createSalon(salon: Sala): any {
    return this.http.post<Sala>(`http://localhost:8080/salas/savesalon`, salon);
  }
  deleteSalon(id:number){
    return this.http.delete<Sala>(`http://localhost:8080/salas/delete/${id}`);
  }
}
