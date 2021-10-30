import { TestBed } from '@angular/core/testing';

import { NewAdminService } from './new-admin.service';

describe('NewAdminService', () => {
  let service: NewAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
