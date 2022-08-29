import { TestBed } from '@angular/core/testing';

import { TareaDocumentosSalidaSolicitudService } from './tarea-documentos-salida-solicitud.service';

describe('TareaDocumentosSalidaSolicitudService', () => {
  let service: TareaDocumentosSalidaSolicitudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TareaDocumentosSalidaSolicitudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
