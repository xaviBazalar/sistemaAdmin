import { TestBed } from '@angular/core/testing';

import { SolitudesUsuarioService } from './solitudes-usuario.service';

describe('SolitudesUsuarioService', () => {
  let service: SolitudesUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolitudesUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
