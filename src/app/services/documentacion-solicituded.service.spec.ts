import { TestBed } from '@angular/core/testing';

import { DocumentacionSolicitudedService } from './documentacion-solicituded.service';

describe('DocumentacionSolicitudedService', () => {
  let service: DocumentacionSolicitudedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentacionSolicitudedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
