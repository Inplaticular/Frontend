import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IdentityService } from 'src/app/modules/identity/services/identity.service';

@Component({
  selector: 'app-identity-set-new-password',
  templateUrl: './identity-set-new-password.component.html',
  styleUrls: ['./identity-set-new-password.component.css']
})
export class IdentitySetNewPasswordComponent implements OnInit {
  formModel = this.formBuilder.group({
    resetToken: ['', Validators.required],
    resetEmail: ['', [Validators.required, Validators.email]],
    passwords: this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^a-zA-Z0-9\d]).{0,}$/)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.comparePasswords })

  });

  constructor(private router: Router, private formBuilder: FormBuilder, private identityService: IdentityService, private toastrService: ToastrService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.identityService.sendChangePasswordRequest({email: this.formModel.value.resetEmail, resetToken: this.formModel.value.resetToken, newPassword: this.formModel.value.password})
      .subscribe({
        next: this.onSubmitSuccess.bind(this),
        error: this.onSubmitError.bind(this)
      });
  }

  onSubmitSuccess(response: any) {
    if (response.succeeded) {
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