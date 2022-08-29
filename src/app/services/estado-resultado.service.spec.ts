import { TestBed } from '@angular/core/testing';

import { EstadoResultadoService } from './estado-resultado.service';

describe('EstadoResultadoService', () => {
  let service: EstadoResultadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadoResultadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
