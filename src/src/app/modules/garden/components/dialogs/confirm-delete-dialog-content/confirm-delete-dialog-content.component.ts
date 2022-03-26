import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete-dialog-content',
  templateUrl: './confirm-delete-dialog-content.component.html',
  styleUrls: ['./confirm-delete-dialog-content.component.scss']
})
export class ConfirmDeleteDialogContentComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { target: string }) { }

  ngOnInit() {
  }

}
