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
}
