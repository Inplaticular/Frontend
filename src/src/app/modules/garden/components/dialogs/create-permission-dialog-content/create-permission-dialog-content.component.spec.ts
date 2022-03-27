/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CreatePermissionDialogContentComponent } from './create-permission-dialog-content.component';

describe('CreatePermissionDialogContentComponent', () => {
  let component: CreatePermissionDialogContentComponent;
  let fixture: ComponentFixture<CreatePermissionDialogContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePermissionDialogContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePermissionDialogContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
