import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { GardenService } from '../../services/garden.service';
import { ConfirmDeleteDialogContentComponent } from '../dialogs/confirm-delete-dialog-content/confirm-delete-dialog-content.component';

@Component({
  selector: 'app-garden-list-item',
  templateUrl: './garden-list-item.component.html',
  styleUrls: ['./garden-list-item.component.scss']
})
export class GardenListItemComponent implements OnInit {
  @Input() garden: any;
  @ViewChild('nameInput') nameInput!: ElementRef<HTMLInputElement>;

  editing: boolean = false;

  constructor(private dialog: MatDialog, private gardenService: GardenService, private toastrService: ToastrService) { }

  ngOnInit() {
  }

  startEdit() {
    this.editing = true;
  }

  viewGarden() {

  }

  submitEdit() {
    this.gardenService.sendUpdateGardenRequest({ gardenId: this.garden.id, name: this.nameInput.nativeElement.value }).subscribe({
      next: (response: any) => this.onSubmitSuccess(response, () => {
        window.location.reload();
      }),
      error: this.onSubmitError.bind(this)
    });

    this.editing = false;
  }

  cancelEdit() {
    this.editing = false;
  }

  startDelete() {
    this.dialog.open(ConfirmDeleteDialogContentComponent, {
      data: {
        target: `Garden: ${this.garden.name}`
      }
    }).afterClosed().subscribe(((result: boolean) => {
      if (!result)
        return;

      this.gardenService.sendDeleteGardenRequest({ gardenId: this.garden.id }).subscribe({
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
