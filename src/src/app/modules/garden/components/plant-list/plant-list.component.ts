import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
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
  @Input() garden: any;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private dialog: MatDialog, private gardenService: GardenService, private toastrService: ToastrService) {
    
  }

  ngOnInit() {
  }

  startCreate() {
    this.dialog.open(CreatePlantDialogContentComponent, { data: { gardenId: this.garden.id }});
  }
}