import { TestBed } from '@angular/core/testing';

import { unitprogramervice } from './unitprogram.service';

describe('UnitprogramService', () => {
  let service: unitprogramervice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(unitprogramervice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
