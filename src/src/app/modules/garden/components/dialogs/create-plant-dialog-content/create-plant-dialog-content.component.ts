import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { GardenService } from '../../../services/garden.service';

@Component({
  selector: 'app-create-plant-dialog-content',
  templateUrl: './create-plant-dialog-content.component.html',
  styleUrls: ['./create-plant-dialog-content.component.scss']
})
export class CreatePlantDialogContentComponent implements OnInit {
  selectedBotanicalName!: string;
  plantData: any[] = [];

  constructor(private gardenService: GardenService, private toastrService: ToastrService, @Inject(MAT_DIALOG_DATA) public data: { gardenId: string }) { }

  ngOnInit() {
    this.gardenService.sendGetPlantDataRequest().subscribe({
      next: (response: any) => this.onSubmitSuccess(response, () => {
        this.plantData = response.plantDataList;
        
        if (this.plantData.length > 0)
          this.selectedBotanicalName = this.plantData[0].botanicalName;

        console.log(response.plantDataList);
      }),
      error: this.onSubmitError.bind(this)
    });
  }

  onCreate() {
    console.log(`GardenId: ${this.data.gardenId}; BotanicalName: ${this.selectedBotanicalName}`);
    this.gardenService.sendCreatePlantRequest({ gardenId: this.data.gardenId, botanicalName: this.selectedBotanicalName }).subscribe({
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
