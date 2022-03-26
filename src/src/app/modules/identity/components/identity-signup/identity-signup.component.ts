import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IdentityService } from '../../services/identity.service';

@Component({
  selector: 'app-identity-signup',
  templateUrl: './identity-signup.component.html',
  styleUrls: ['./identity-signup.component.css']
})
export class IdentitySignupComponent implements OnInit {
  formModel = this.formBuilder.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    passwords: this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^a-zA-Z0-9\d]).{0,}$/)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.comparePasswords })

  });

  constructor(private router: Router, private formBuilder: FormBuilder, private identityService: IdentityService, private toastrService: ToastrService) { }

  ngOnInit() {
    
  }

  onSubmit() {
    this.identityService.sendSignUpRequest({ username: this.formModel.value.username, email: this.formModel.value.email, password: this.formModel.value.passwords.password})
      .subscribe({
        next: this.onSubmitSuccess.bind(this),
        error: this.onSubmitError.bind(this)
      })
  }

  onSubmitSuccess(response: any) {
    if (response.succeeded) {
      this.formModel.reset();
      this.router.navigateByUrl('/identity/login');
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

  comparePasswords(formGroup: FormGroup) {
    let confirmPwdCtrl = formGroup.get('confirmPassword')!;
    
    if (confirmPwdCtrl.errors == null || 'passwordMismatch' in confirmPwdCtrl.errors) {
      if (formGroup.get('password')!.value != confirmPwdCtrl.value)
        confirmPwdCtrl.setErrors({ passwordMismatch: true });
      else
        confirmPwdCtrl.setErrors(null);
    }
  }
}
