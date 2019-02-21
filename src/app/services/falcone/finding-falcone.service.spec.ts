import { TestBed } from '@angular/core/testing';

import { FindingFalconeService } from './finding-falcone.service';

describe('FindingFalconeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FindingFalconeService = TestBed.get(FindingFalconeService);
    expect(service).toBeTruthy();
  });
});
