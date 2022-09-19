import { TestBed } from '@angular/core/testing';

import { BobsBurgersApiService } from './bobs-burgers-api.service';

describe('BobsBurgersApiService', () => {
  let service: BobsBurgersApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BobsBurgersApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
