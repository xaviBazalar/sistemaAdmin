import { TestBed } from '@angular/core/testing';

import { GerenciasService } from './gerencias.service';

describe('GerenciasService', () => {
  let service: GerenciasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GerenciasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
