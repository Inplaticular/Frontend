/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IdentityForgotPasswordComponent } from './identity-forgot-password.component';

describe('IdentityForgotPasswordComponent', () => {
  let component: IdentityForgotPasswordComponent;
  let fixture: ComponentFixture<IdentityForgotPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdentityForgotPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentityForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
