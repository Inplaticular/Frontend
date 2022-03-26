import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { IdentityService } from 'src/app/modules/identity/services/identity.service';
import { GardenService } from '../../services/garden.service';
import { ConfirmDeleteDialogContentComponent } from '../dialogs/confirm-delete-dialog-content/confirm-delete-dialog-content.component';

@Component({
  selector: 'app-permission-list-item',
  templateUrl: './permission-list-item.component.html',
  styleUrls: ['./permission-list-item.component.scss']
})
export class PermissionListItemComponent implements OnInit, OnChanges {
  @Input() permission: any;
  @Input() gardenId!: string;
  user: string = '';

  constructor(private dialog: MatDialog, private identityService: IdentityService, private gardenService: GardenService, private toastrService: ToastrService) { }

  ngOnInit() {
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (!this.permission)
      return;

    this.user = this.permission.userId;

    this.identityService.sendGetUserByIdRequest(this.permission.userId).subscribe({
      next: (response: any) => this.onSubmitSuccess(response, () => {
        this.user = response.content.user.username;
      }),
      error: this.onSubmitError.bind(this)
    });
  }

  startDelete() {
    this.dialog.open(ConfirmDeleteDialogContentComponent, {
      data: {
        target: `Permission: ${this.user}: ${this.permission.value}`
      }
    }).afterClosed().subscribe(((result: boolean) => {
      if (!result)
        return;

      this.gardenService.sendDeleteGardenPermission({ gardenId: this.gardenId, permissionId: this.permission.id }).subscribe({
        next: (response: any) => this.onSubmitSuccess(response, () => {
          window.location.reload();
        }),
        error: this.onSubmitError.bind(this)
      });
    }).bind(this));
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
