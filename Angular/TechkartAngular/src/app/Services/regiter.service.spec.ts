import { TestBed } from '@angular/core/testing';

import { RegiterService } from './regiter.service';

describe('RegiterService', () => {
  let service: RegiterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegiterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
