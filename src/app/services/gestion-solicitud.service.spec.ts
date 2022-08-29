import { TestBed } from '@angular/core/testing';

import { GestionSolicitudService } from './gestion-solicitud.service';

describe('GestionSolicitudService', () => {
  let service: GestionSolicitudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionSolicitudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
