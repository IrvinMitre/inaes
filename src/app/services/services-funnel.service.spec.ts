import { TestBed } from '@angular/core/testing';

import { ServicesFunnelGuard } from './services-funnel.service';

describe('ServicesFunnelGuard', () => {
  let service: ServicesFunnelGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicesFunnelGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
