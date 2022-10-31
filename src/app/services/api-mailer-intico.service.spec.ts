import { TestBed } from '@angular/core/testing';

import { ApiMailerInticoService } from './api-mailer-intico.service';

describe('ApiMailerInticoService', () => {
  let service: ApiMailerInticoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiMailerInticoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
