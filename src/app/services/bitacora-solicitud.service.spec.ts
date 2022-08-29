import { TestBed } from '@angular/core/testing';

import { BitacoraSolicitudService } from './bitacora-solicitud.service';

describe('BitacoraSolicitudService', () => {
  let service: BitacoraSolicitudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BitacoraSolicitudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
