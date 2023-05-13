import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../app.constants';
import { BasicJWTAuthServicesService } from './basic-jwtauth-services.service';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(
    private http: HttpClient,
    private basicAuthenticationService: BasicJWTAuthServicesService

  ) { }

  uploadFile(formData: FormData):Observable<any>{
    return this.http.post(`${API_URL}/media/upload`, formData);
  }
  mostrarFile(url : String):Observable<any>{
    {
      const token = this.basicAuthenticationService.getAuthenticatedToken();

  
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + token
      });
  
      return this.http.get(`${url}`,{ headers: headers, responseType: 'blob' });
    }
    // return this.http.get(`${url}`);
  }
}
