import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecifyGetYieldDialogContentComponent } from './specify-get-yield-dialog-content.component';

describe('SpecifyGetYieldDialogContentComponent', () => {
  let component: SpecifyGetYieldDialogContentComponent;
  let fixture: ComponentFixture<SpecifyGetYieldDialogContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecifyGetYieldDialogContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecifyGetYieldDialogContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
