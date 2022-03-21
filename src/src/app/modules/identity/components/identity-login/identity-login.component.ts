import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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

  constructor(private router: Router, private identityService: IdentityService, private toastrService: ToastrService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.identityService.sendLoginRequest(this.formModel)
      .subscribe({
        next: this.onSubmitSuccess.bind(this),
        error: this.onSubmitError.bind(this)
      })
  }

  onSubmitSuccess(response: any) {
    if (response.succeeded) {
      localStorage.setItem('token', response.content.token);
      this.router.navigateByUrl('');
      response.messages.forEach((message: any) => {
        console.log(`${message.code}: ${message.description}`);
        this.toastrService.success(message.description, message.code);
      });
    } else {
      response.errors.forEach((error: any) => {
        console.error(`${error.code}: ${error.description}`);
        this.toastrService.error(error.description, error.code);
      });
    }
  }

  onSubmitError(error: any) {    
    if (!(error instanceof HttpErrorResponse)) {
      console.error(error);
      return;
    }

    if (error.error.errors && error.error.errors instanceof Array) {
      error.error.errors.forEach((error: any) => {
        console.error(`${error.code}: ${error.description}`);
        this.toastrService.error(error.description, error.code);
      });
    }
  }
}
