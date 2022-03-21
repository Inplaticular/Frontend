import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IdentityService } from '../../services/identity.service';

@Component({
  selector: 'app-identity-login',
  templateUrl: './identity-login.component.html',
  styleUrls: ['./identity-login.component.css']
})
export class IdentityLoginComponent implements OnInit {
  formModel: { usernameEmail: string, password: string } = {
    usernameEmail: '',
    password: ''
  }

  constructor(private router: Router, private identityService: IdentityService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.identityService.sendLoginRequest(this.formModel)
      .subscribe({
        next: this.onSubmitSuccess.bind(this),
        error: (error) => { console.log(error) }
      })
  }

  onSubmitSuccess(response: any) {
    if (response.succeeded) {
      localStorage.setItem('token', response.content.token);
      this.router.navigateByUrl('');
      response.messages.forEach((message: any) => {
        console.log(`${message.code}: ${message.description}`);
      });
    } else {
      response.errors.forEach((error: any) => {
        console.error(`${error.code}: ${error.description}`);
      });
    }
  }
}
