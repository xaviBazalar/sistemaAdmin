import { TestBed } from '@angular/core/testing';

import { ContratosGerenciaService } from './contratos-gerencia.service';

describe('ContratosGerenciaService', () => {
  let service: ContratosGerenciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContratosGerenciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
