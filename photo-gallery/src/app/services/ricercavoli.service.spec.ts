import { TestBed } from '@angular/core/testing';

import { RicercavoliService } from './ricercavoli.service';

describe('RicercavoliService', () => {
  let service: RicercavoliService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RicercavoliService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
