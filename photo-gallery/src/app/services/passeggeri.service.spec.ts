import { TestBed } from '@angular/core/testing';

import { PasseggeriService } from './passeggeri.service';

describe('PasseggeriService', () => {
  let service: PasseggeriService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasseggeriService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
