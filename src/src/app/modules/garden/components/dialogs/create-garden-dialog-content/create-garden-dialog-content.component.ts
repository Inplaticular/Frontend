import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GardenService } from '../../../services/garden.service';

@Component({
  selector: 'app-create-garden-dialog-content',
  templateUrl: './create-garden-dialog-content.component.html',
  styleUrls: ['./create-garden-dialog-content.component.scss']
})
export class CreateGardenDialogContentComponent implements OnInit {
  @ViewChild('nameInput') nameInput!: ElementRef<HTMLInputElement>;

  constructor(private gardenService: GardenService, private toastrService: ToastrService) { }

  ngOnInit() {
  }

  onCreate() {
    this.gardenService.sendCreateGardenRequest(this.nameInput.nativeElement.value).subscribe({
      next: (response: any) => this.onSubmitSuccess(response, () => {
        window.location.reload();
      }),
      error: this.onSubmitError.bind(this)
    })
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
