import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class IdentityService {
    constructor(private http: HttpClient) { }

    sendSignUpRequest(body: { username: string, email: string, password: string }): Observable<any> {
        return this.http.post(environment.apiRoutes.identity.signUp, body)
    }
}