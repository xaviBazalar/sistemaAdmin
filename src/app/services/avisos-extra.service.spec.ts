import { TestBed } from '@angular/core/testing';

import { AvisosExtraService } from './avisos-extra.service';

describe('AvisosExtraService', () => {
  let service: AvisosExtraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvisosExtraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
