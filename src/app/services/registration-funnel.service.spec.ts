import { TestBed } from '@angular/core/testing';

import { RegistrationFunnelGuard } from './registration-funnel.service';

describe('RegistrationFunnelGuard', () => {
  let service: RegistrationFunnelGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrationFunnelGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
