import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecifyGetGrowthDialogContentComponent } from './specify-get-growth-dialog-content.component';

describe('SpecifyGetGrowthDialogContentComponent', () => {
  let component: SpecifyGetGrowthDialogContentComponent;
  let fixture: ComponentFixture<SpecifyGetGrowthDialogContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecifyGetGrowthDialogContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecifyGetGrowthDialogContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
