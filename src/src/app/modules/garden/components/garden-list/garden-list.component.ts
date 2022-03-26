import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { GardenService } from '../../services/garden.service';
import { CreateGardenDialogContentComponent } from '../dialogs/create-garden-dialog-content/create-garden-dialog-content.component';

@Component({
  selector: 'app-garden-list',
  templateUrl: './garden-list.component.html',
  styleUrls: ['./garden-list.component.scss']
})
export class GardenListComponent implements OnInit {
  gardens: any[] = [];

  constructor(private dialog: MatDialog, private gardenService: GardenService, private toastrService: ToastrService) {
    this.gardenService.sendGetGardenListRequest().subscribe({
      next: this.onSubmitSuccess.bind(this),
      error: this.onSubmitError.bind(this)
    })
  }

  ngOnInit() {

  }

  startCreate() {
    this.dialog.open(CreateGardenDialogContentComponent)
  }

  onSubmitSuccess(response: any) {
    if (response.succeeded) {
      this.gardens = response.gardens;
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
