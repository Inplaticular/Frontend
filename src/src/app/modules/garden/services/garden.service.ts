import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import jwtDecode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class GardenService {

  constructor(private http: HttpClient) { }

  sendGetGardenListRequest(): Observable<any> {
    const tokenString = localStorage.getItem(environment.authTokenKey) as string;
    const token = jwtDecode(tokenString, undefined) as any;

    return this.http.get(environment.apiRoutes.garden.gardenList+`?UserId=${token.sub}`, { headers: this.createAuthHeaders() });
  }

  sendCreateGardenRequest(name: string): Observable<any> {
    const tokenString = localStorage.getItem(environment.authTokenKey) as string;
    const token = jwtDecode(tokenString, undefined) as any;

    return this.http.post(environment.apiRoutes.garden.garden, { userId: token.sub, name: name }, { headers: this.createAuthHeaders() })
  }

  sendUpdateGardenRequest(body: { gardenId: string, name: string }): Observable<any> {
    return this.http.put(environment.apiRoutes.garden.garden, body, { headers: this.createAuthHeaders() })
  }

  sendDeleteGardenRequest(body: { gardenId: string }): Observable<any> {
    return this.http.delete(environment.apiRoutes.garden.garden, { body: body, headers: this.createAuthHeaders() })
  }

  createAuthHeaders(): {[header: string]: string | string[]; } {
    const headers: {[header: string]: string | string[]; } = {};

    const tokenString = localStorage.getItem(environment.authTokenKey) as string;
    headers[environment.authTokenHeaderKey] = tokenString;
    headers['Content-Type'] = 'application/json';

    return headers
  }
}