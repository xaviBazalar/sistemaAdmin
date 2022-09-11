import { TestBed } from '@angular/core/testing';

import { DocumentosEntradaService } from './documentos-entrada.service';

describe('DocumentosEntradaService', () => {
  let service: DocumentosEntradaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentosEntradaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
