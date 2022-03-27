import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { IdentityService } from 'src/app/modules/identity/services/identity.service';
import { GardenService } from '../../../services/garden.service';

@Component({
  selector: 'app-create-permission-dialog-content',
  templateUrl: './create-permission-dialog-content.component.html',
  styleUrls: ['./create-permission-dialog-content.component.scss']
})
export class CreatePermissionDialogContentComponent implements OnInit {
  formModel = this.formBuilder.group({
    userInput: [''],
    userSelect: [''],
    roleSelect: ['']
  });

  users: any[] = [];
  roles: string[] = [];

  @ViewChild('userSelect') userSelect!: ElementRef<HTMLSelectElement>
  @ViewChild('roleSelect') roleSelect!: ElementRef<HTMLSelectElement>

  constructor(private formBuilder: FormBuilder, private identityService: IdentityService, private gardenService: GardenService, private toastrService: ToastrService, @Inject(MAT_DIALOG_DATA) public data: { gardenId: string }) {
    this.formModel.controls["userInput"].valueChanges.subscribe((data) => this.onUserNameInput(data))

    this.gardenService.sendGetGardenRoles().subscribe({
      next: (response: any) => this.onSubmitSuccess(response, () => {
        this.roles = response.gardenRoles;
      }),
      error: this.onSubmitError.bind(this)
    })
  }

  ngOnInit() {
  }

  onUserNameInput(data: string) {
    if (data.length === 0)
      return;

    this.identityService.sendGetUserNameOrEmailRequest(data).subscribe({
      next: (response: any) => this.onSubmitSuccess(response, () => {
        this.users = response.content.users;
      }),
      error: this.onSubmitError.bind(this)
    })
  }

  onCreate() {
    this.gardenService.sendAddPermissionRequest(this.data.gardenId, this.userSelect.nativeElement.value, 'Role', this.roleSelect.nativeElement.value).subscribe({
      next: (response: any) => this.onSubmitSuccess(response, () => {
        window.location.reload();
      }),
      error: this.onSubmitError.bind(this)
    });
  }

  onSubmitSuccess(response: any, onSuccessAction: (() => void)) {
    if (response.succeeded) {
      onSuccessAction();
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
