import { TestBed } from '@angular/core/testing';

import { TareaDocumentosEntradaSolicitudService } from './tarea-documentos-entrada-solicitud.service';

describe('TareaDocumentosEntradaSolicitudService', () => {
  let service: TareaDocumentosEntradaSolicitudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TareaDocumentosEntradaSolicitudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
