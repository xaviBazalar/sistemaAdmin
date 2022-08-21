import { TestBed } from '@angular/core/testing';

import { HistorialResultadoSolicitudService } from './historial-resultado-solicitud.service';

describe('HistorialResultadoSolicitudService', () => {
  let service: HistorialResultadoSolicitudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistorialResultadoSolicitudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
