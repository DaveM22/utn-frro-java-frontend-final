import { TestBed } from '@angular/core/testing';

import { ProvinceService } from './provincia.service';

describe('ProvinciaService', () => {
  let service: ProvinceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProvinceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
