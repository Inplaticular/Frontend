/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GardenListItemComponent } from './garden-list-item.component';

describe('GardenListItemComponent', () => {
  let component: GardenListItemComponent;
  let fixture: ComponentFixture<GardenListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GardenListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GardenListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
