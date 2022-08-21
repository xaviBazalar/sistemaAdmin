import { TestBed } from '@angular/core/testing';

import { TareaDocumentosEntradaService } from './tarea-documentos-entrada.service';

describe('TareaDocumentosEntradaService', () => {
  let service: TareaDocumentosEntradaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TareaDocumentosEntradaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
