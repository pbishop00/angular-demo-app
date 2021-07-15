import { TestBed } from '@angular/core/testing';

import { ColorsApiService } from './colors-api.service';

describe('ColorsApiService', () => {
  let service: ColorsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColorsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
