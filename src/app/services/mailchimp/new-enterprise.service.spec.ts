import { TestBed } from '@angular/core/testing';

import { NewEnterpriseService } from './new-enterprise.service';

describe('NewEnterpriseService', () => {
  let service: NewEnterpriseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewEnterpriseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
