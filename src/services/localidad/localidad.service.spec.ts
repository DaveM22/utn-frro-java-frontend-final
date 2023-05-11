import { TestBed } from '@angular/core/testing';

import { LocationService } from './localidad.service';

describe('LocalidadService', () => {
  let service: LocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
