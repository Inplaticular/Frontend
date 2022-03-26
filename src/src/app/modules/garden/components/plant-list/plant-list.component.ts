import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GardenService } from '../../services/garden.service';
import { CreatePlantDialogContentComponent } from '../dialogs/create-plant-dialog-content/create-plant-dialog-content.component';

@Component({
  selector: 'app-plant-list',
  templateUrl: './plant-list.component.html',
  styleUrls: ['./plant-list.component.scss']
})
export class PlantListComponent implements OnInit {
  garden: any;
  plants: any[] = []

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private dialog: MatDialog, private gardenService: GardenService, private toastrService: ToastrService) {
    this.activatedRoute.params.subscribe((params: any) => {
      this.gardenService.sendGetGardenDetailRequest(params.id).subscribe({
        next: this.onSubmitSuccess.bind(this),
        error: this.onSubmitError.bind(this)
      });
    });
  }

  ngOnInit() {
  }

  startCreate() {
    this.dialog.open(CreatePlantDialogContentComponent, { data: { gardenId: this.garden.id }});
  }

  onSubmitSuccess(response: any) {
    if (response.succeeded) {
      console.log(response.garden)
      this.garden = response.garden;
      this.plants = response.garden.plants;
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
    console.error(error);
    if (!(error instanceof HttpErrorResponse)) {
      return;
    }

    if (error.error.errors && error.error.errors instanceof Array) {
      error.error.errors.forEach((error: any) => {
        console.error(`${error.code}: ${error.description}`);
        this.toastrService.error(error.description, error.code);
      });
    }

    if (error.status === 401) {
      this.router.navigateByUrl("/user");
    }
  }
}