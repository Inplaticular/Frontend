import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { GardenMainComponent } from './garden.component';
import { GardenRoutingModule } from './garden-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './components/user/user.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { GardenListComponent } from './components/garden-list/garden-list.component';
import { GardenListItemComponent } from './components/garden-list-item/garden-list-item.component';
import { ConfirmDeleteDialogContentComponent } from './components/dialogs/confirm-delete-dialog-content/confirm-delete-dialog-content.component';
import { CreateGardenDialogContentComponent } from './components/dialogs/create-garden-dialog-content/create-garden-dialog-content.component';

@NgModule({
  imports: [
    CommonModule,
    GardenRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  declarations: [
    GardenMainComponent,
    UserComponent,
    UserInfoComponent,
    GardenListComponent,
    GardenListItemComponent,
    ConfirmDeleteDialogContentComponent,
    CreateGardenDialogContentComponent
  ]
})
export class GardenModule { }
