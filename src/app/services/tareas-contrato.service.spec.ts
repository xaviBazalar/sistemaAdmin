import { TestBed } from '@angular/core/testing';

import { TareasContratoService } from './tareas-contrato.service';

describe('TareasContratoService', () => {
  let service: TareasContratoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TareasContratoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
