import { TestBed } from '@angular/core/testing';

import { AsignacionprogramsService } from './asignacionprograms.service';

describe('AsignacionprogramsService', () => {
  let service: AsignacionprogramsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsignacionprogramsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
