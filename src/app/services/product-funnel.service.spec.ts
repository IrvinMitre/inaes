import { TestBed } from '@angular/core/testing';

import { ProductFunnelService } from './product-funnel.service';

describe('ProductFunnelService', () => {
  let service: ProductFunnelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductFunnelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
