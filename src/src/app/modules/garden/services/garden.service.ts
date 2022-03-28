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

  sendGetGardenDetailRequest(gardenId: string): Observable<any> {
    return this.http.get(environment.apiRoutes.garden.garden+`?GardenId=${gardenId}`, { headers: this.createAuthHeaders() });
  }

  sendGetPlantDataRequest(): Observable<any> {
    return this.http.get(environment.apiRoutes.garden.plantData);
  }

  sendCreatePlantRequest(body: { gardenId: string, botanicalName: string }): Observable<any> {
    return this.http.post(environment.apiRoutes.garden.plants, body, { headers: this.createAuthHeaders() });
  }

  sendDeletePlantRequest(body: { plantId: string }): Observable<any> {
    return this.http.delete(environment.apiRoutes.garden.plants, { body: body, headers: this.createAuthHeaders() })
  }

  sendGetGardenPermissions(gardenId: string): Observable<any> {
    return this.http.get(environment.apiRoutes.garden.gardenPermissions+`?GardenId=${gardenId}`, { headers: this.createAuthHeaders() });
  }
  sendGetPlantYield(body: { plantId: string,fertilizerPercentage: number, actFruitCount: number, daysWithoutWater: number }): Observable<any> {
    return this.http.post(environment.apiRoutes.garden.plantsYield, body, { headers: this.createAuthHeaders()});
  }
  sendGetPlantGrowth(body: { plantId: string,fertilizerPercentage: number, daysWithoutWater: number }): Observable<any> {
    return this.http.post(environment.apiRoutes.garden.plantsGrowth, body, { headers: this.createAuthHeaders()});
  }

  sendAddPermissionRequest(gardenId: string, userId: string, type: string, value: string): Observable<any> {
    return this.http.post(environment.apiRoutes.garden.gardenPermissions, { gardenId: gardenId, userId: userId, type: type, value: value }, { headers: this.createAuthHeaders() });
  }

  sendDeleteGardenPermission(body: { gardenId: string, permissionId: string }): Observable<any> {
    return this.http.delete(environment.apiRoutes.garden.gardenPermissions, { body: body, headers: this.createAuthHeaders() });
  }

  sendGetGardenRoles(): Observable<any> {
    return this.http.get(environment.apiRoutes.garden.gardenRoles);
  }

  createAuthHeaders(): {[header: string]: string | string[]; } {
    const headers: {[header: string]: string | string[]; } = {};

    const tokenString = localStorage.getItem(environment.authTokenKey) as string;
    headers[environment.authTokenHeaderKey] = tokenString;
    headers['Content-Type'] = 'application/json';

    return headers
  }
}
