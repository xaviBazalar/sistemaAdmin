import { TestBed } from '@angular/core/testing';

import { TareaDocumentosSalidaService } from './tarea-documentos-salida.service';

describe('TareaDocumentosSalidaService', () => {
  let service: TareaDocumentosSalidaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TareaDocumentosSalidaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
