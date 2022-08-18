import { TestBed } from '@angular/core/testing';

import { EstadosSolicitudService } from './estados-solicitud.service';

describe('EstadosSolicitudService', () => {
  let service: EstadosSolicitudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadosSolicitudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
