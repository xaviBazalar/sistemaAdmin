import { TestBed } from '@angular/core/testing';

import { UploadGoogleStorageService } from './upload-google-storage.service';

describe('UploadGoogleStorageService', () => {
  let service: UploadGoogleStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadGoogleStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
