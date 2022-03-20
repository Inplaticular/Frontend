import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private router: Router, private formBuilder: FormBuilder, private identityService: IdentityService) { }

  ngOnInit() {
    
  }

  onSubmit() {
    this.identityService.sendSignUpRequest({ username: this.formModel.value.username, email: this.formModel.value.email, password: this.formModel.value.passwords.password})
      .subscribe({
        next: this.onSubmitSuccess.bind(this),
        error: (error) => { console.log(error) }
      })
  }

  onSubmitSuccess(response: any) {
    if (response.succeeded) {
      this.formModel.reset();
      response.messages.forEach((message: any) => {
        console.log(`${message.code}: ${message.description}`);
      });
    } else {
      response.errors.forEach((error: any) => {
        console.error(`${error.code}: ${error.description}`);
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
