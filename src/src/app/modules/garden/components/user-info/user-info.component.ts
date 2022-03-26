import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import jwtDecode from "jwt-decode";
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  username: string = '';
  email: string = '';

  constructor(private router: Router) {
    var jwt = localStorage.getItem(environment.authTokenKey);

    if (jwt == null)
      return;

    var token = jwtDecode(jwt, undefined) as any;

    this.username = token.unique_name;
    this.email = token.email;
  }

  ngOnInit() {  }

  logout() {
    localStorage.removeItem(environment.authTokenKey);
    this.router.navigateByUrl('/identity/login');
  }
}
