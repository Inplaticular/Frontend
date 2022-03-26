/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GardenListComponent } from './garden-list.component';

describe('GardenListComponent', () => {
  let component: GardenListComponent;
  let fixture: ComponentFixture<GardenListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GardenListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GardenListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
