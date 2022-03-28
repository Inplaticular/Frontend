import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { GardenService } from '../../services/garden.service';
import { ConfirmDeleteDialogContentComponent } from '../dialogs/confirm-delete-dialog-content/confirm-delete-dialog-content.component';
import {
  SpecifyGetYieldDialogContentComponent
} from "../dialogs/specify-get-yield-dialog-content/specify-get-yield-dialog-content.component";
import {
  SpecifyGetGrowthDialogContentComponent
} from "../dialogs/specify-get-growth-dialog-content/specify-get-growth-dialog-content.component";

@Component({
  selector: 'app-plant-list-item',
  templateUrl: './plant-list-item.component.html',
  styleUrls: ['./plant-list-item.component.scss']
})
export class PlantListItemComponent implements OnInit {
  @Input() plant: any;

  constructor(private dialog: MatDialog,private gardenService: GardenService, private toastrService: ToastrService) { }

  ngOnInit() {
  }

  startDelete() {
    this.dialog.open(ConfirmDeleteDialogContentComponent, {
      data: {
        target: `Plant: ${this.plant.plantData.friendlyName}`
      }
    }).afterClosed().subscribe(((result: boolean) => {
      if (!result)
        return;

      this.gardenService.sendDeletePlantRequest({ plantId: this.plant.id }).subscribe({
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

  startYield() {
    var dialogRef = this.dialog.open(SpecifyGetYieldDialogContentComponent, {
      data: {
        plantId: this.plant.id
      }
    });
    dialogRef.backdropClick().subscribe(result => {
      dialogRef.close();
      window.location.reload()
    });
  }

  startGrowth() {
    var dialogRef = this.dialog.open(SpecifyGetGrowthDialogContentComponent, {
      data: {
        plantId: this.plant.id
      }
    });
    dialogRef.backdropClick().subscribe(result => {
      dialogRef.close();
      window.location.reload()
    });
  }
}
