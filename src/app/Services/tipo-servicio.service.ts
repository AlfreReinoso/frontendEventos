import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoServicio } from '../model/tiposervicio';
import {API_URL} from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class TipoServicioService {

  constructor(private http: HttpClient) { }


  saveTipoServicio(tipoServicio: TipoServicio): Observable<TipoServicio> {
    return this.http.post<TipoServicio>(`${API_URL}/tipoServicio/save`, tipoServicio);
  }

  update(tipoServicio: TipoServicio): Observable<TipoServicio> {
    return this.http.put<TipoServicio>(`${API_URL}/tipoServicio/update`, tipoServicio);
  }

  delete(id: number): Observable<TipoServicio> {
    return this.http.delete<TipoServicio>(`${API_URL}/tipoServicio/delete/${id}`);
  }

  findAll(): Observable<TipoServicio[]>{
    return this.http.get<TipoServicio[]>(`${API_URL}/tipoServicio/findAll`);
  }
}
