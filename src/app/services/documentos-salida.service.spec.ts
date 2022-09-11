import { TestBed } from '@angular/core/testing';

import { DocumentosSalidaService } from './documentos-salida.service';

describe('DocumentosSalidaService', () => {
  let service: DocumentosSalidaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentosSalidaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
