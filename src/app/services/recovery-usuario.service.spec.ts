import { TestBed } from '@angular/core/testing';

import { RecoveryUsuarioService } from './recovery-usuario.service';

describe('RecoveryUsuarioService', () => {
  let service: RecoveryUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecoveryUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
