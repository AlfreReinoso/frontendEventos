import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Administrativo} from "../model/administrativo";

@Injectable({
  providedIn: 'root'
})
export class AdministrativoService {

  constructor(private http:HttpClient) { }

  getAdministrativo(nameUsuario: string): Observable<Administrativo>{
    return this.http.get<Administrativo>(`http://localhost:8080/administrativos/findAdministrativo/${nameUsuario}`);
  }
}
