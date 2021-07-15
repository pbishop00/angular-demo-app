import { TestBed } from '@angular/core/testing';

import { CalcHistoryServiceService } from './calc-history-service.service';

describe('CalcHistoryServiceService', () => {
  let service: CalcHistoryServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalcHistoryServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
