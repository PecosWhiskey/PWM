import { TestBed } from '@angular/core/testing';

import { AeroportiService } from './aeroporti.service';

describe('AeroportiService', () => {
  let service: AeroportiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AeroportiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
