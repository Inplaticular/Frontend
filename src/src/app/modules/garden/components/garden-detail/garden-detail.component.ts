import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GardenService } from '../../services/garden.service';

@Component({
  selector: 'app-garden-detail',
  templateUrl: './garden-detail.component.html',
  styleUrls: ['./garden-detail.component.scss']
})
export class GardenDetailComponent implements OnInit {
  garden: any;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private gardenService: GardenService, private toastrService: ToastrService) {
    this.activatedRoute.params.subscribe((params: any) => {
      this.gardenService.sendGetGardenDetailRequest(params.id).subscribe({
        next: this.onSubmitSuccess.bind(this),
        error: this.onSubmitError.bind(this)
      });
    });
  }

  ngOnInit() {
  }

  onSubmitSuccess(response: any) {
    if (response.succeeded) {
      console.log(response.garden)
      this.garden = response.garden;
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
