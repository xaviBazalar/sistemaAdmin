import { TestBed } from '@angular/core/testing';

import { AutorizarSolicitudService } from './autorizar-solicitud.service';

describe('AutorizarSolicitudService', () => {
  let service: AutorizarSolicitudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutorizarSolicitudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
