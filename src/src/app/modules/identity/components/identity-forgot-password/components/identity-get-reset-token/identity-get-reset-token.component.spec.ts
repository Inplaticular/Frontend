/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IdentityGetResetTokenComponent } from './identity-get-reset-token.component';

describe('IdentityGetResetTokenComponent', () => {
  let component: IdentityGetResetTokenComponent;
  let fixture: ComponentFixture<IdentityGetResetTokenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdentityGetResetTokenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentityGetResetTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
