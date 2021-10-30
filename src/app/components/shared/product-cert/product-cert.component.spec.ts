import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCertComponent } from './product-cert.component';

describe('ProductCertComponent', () => {
  let component: ProductCertComponent;
  let fixture: ComponentFixture<ProductCertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
