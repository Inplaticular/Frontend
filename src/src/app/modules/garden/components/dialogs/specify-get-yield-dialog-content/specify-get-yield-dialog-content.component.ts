import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {FormBuilder} from "@angular/forms";
import {IdentityService} from "../../../../identity/services/identity.service";
import {GardenService} from "../../../services/garden.service";
import {ToastrService} from "ngx-toastr";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-specify-get-yield-dialog-content',
  templateUrl: './specify-get-yield-dialog-content.component.html',
  styleUrls: ['./specify-get-yield-dialog-content.component.scss']
})
export class SpecifyGetYieldDialogContentComponent implements OnInit {


  @ViewChild('fertilizerPercentageInput') fertilizerPercentageInput!: ElementRef<HTMLInputElement>;
  @ViewChild('actFruitCountInput') actFruitCountInput!: ElementRef<HTMLInputElement>;
  @ViewChild('daysWithoutWaterInput') daysWithoutWaterInput!: ElementRef<HTMLInputElement>;
  private yield: number =0;

  constructor(private gardenService: GardenService, private toastrService: ToastrService,@Inject(MAT_DIALOG_DATA) public data: { plantId: string }) { }

  ngOnInit() {
  }

  onCreate() {
    console.log({plantId: this.data.plantId,fertilizerPercentage: parseFloat(this.fertilizerPercentageInput.nativeElement.value),
      actFruitCount: parseInt(this.actFruitCountInput.nativeElement.value),daysWithoutWater:parseFloat( this.daysWithoutWaterInput.nativeElement.value)})
    this.gardenService.sendGetPlantYield({plantId: this.data.plantId,fertilizerPercentage: parseFloat(this.fertilizerPercentageInput.nativeElement.value),
      actFruitCount: parseInt(this.actFruitCountInput.nativeElement.value),daysWithoutWater:parseFloat( this.daysWithoutWaterInput.nativeElement.value)}).subscribe({
      next: (response: any) => this.onSubmitSuccess(response, () => {
        this.yield = response.yield;
      }),

      error: this.onSubmitError.bind(this)
    })
  }
  onSubmitSuccess(response: any, onSuccessAction: (() => void)) {
    if (response.succeeded) {
      response.messages
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
