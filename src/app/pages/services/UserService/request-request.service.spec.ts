import { TestBed } from '@angular/core/testing';

import { RequestRequestService } from './request-request.service';

describe('RequestRequestService', () => {
  let service: RequestRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
