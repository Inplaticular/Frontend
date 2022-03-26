import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IdentityService } from './identity.service';

@Injectable({
  providedIn: 'root'
})
export class UserLoggedInGuard implements CanActivate {
  constructor(private router: Router, private identityService: IdentityService) { }

  canActivate(): Observable<boolean> {
    var authToken = localStorage.getItem(environment.authTokenKey);

    if (authToken == null) {
      this.router.navigateByUrl('/identity/login');
      return of(false);
    }

    try {
      return this.identityService.sendAuthorizeUserRequest({ token: authToken }).pipe(map(data => {
        const authorized = data.content != undefined && data.content.authorized != undefined && data.content.authorized;

        if (!authorized)
          this.router.navigateByUrl('/identity/login');
        
        return authorized;
      }));
    }
    catch (err) {
      this.router.navigateByUrl('/identity/login');
      return of(false)
    };
  }
}