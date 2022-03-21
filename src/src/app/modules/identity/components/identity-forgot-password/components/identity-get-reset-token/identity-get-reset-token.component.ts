import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IdentityService } from 'src/app/modules/identity/services/identity.service';

@Component({
  selector: 'app-identity-get-reset-token',
  templateUrl: './identity-get-reset-token.component.html',
  styleUrls: ['./identity-get-reset-token.component.css']
})
export class IdentityGetResetTokenComponent implements OnInit {
  formModel = this.formBuilder.group({
    requestEmail: ['', [Validators.required, Validators.email]],
  });

  constructor(private formBuilder: FormBuilder, private identityService: IdentityService, private toastrService: ToastrService) { }

  ngOnInit() {

  }

  onSubmit() {
    this.identityService.sendGetResetTokenRequest({email: this.formModel.value.requestEmail})
      .subscribe({
        next: this.onSubmitSuccess.bind(this),
        error: this.onSubmitError.bind(this)
      });
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
}
