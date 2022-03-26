/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GardenService } from './garden.service';

describe('Service: Garden', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GardenService]
    });
  });

  it('should ...', inject([GardenService], (service: GardenService) => {
    expect(service).toBeTruthy();
  }));
});
