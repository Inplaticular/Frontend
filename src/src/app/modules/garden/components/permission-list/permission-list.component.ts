import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GardenService } from '../../services/garden.service';

@Component({
  selector: 'app-permission-list',
  templateUrl: './permission-list.component.html',
  styleUrls: ['./permission-list.component.scss']
})
export class PermissionListComponent implements OnInit, OnChanges {
  @Input() garden: any;
  permissions: any[] = []

  constructor(private gardenService: GardenService, private toastrService: ToastrService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.garden)
      return;

    this.gardenService.sendGetGardenPermissions(this.garden.id).subscribe({
      next: (response: any) => this.onSubmitSuccess(response, () => {
        var permissions: any[] = response.assignedPermissionsForGarden;
        this.permissions = permissions.filter(permission => /*permission.value !== 'Owner'*/ true);
      }),
      error: this.onSubmitError.bind(this)
    })
  }

  startCreate() {

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
