import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPayComponent } from './product-pay.component';

describe('ProductPayComponent', () => {
  let component: ProductPayComponent;
  let fixture: ComponentFixture<ProductPayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductPayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
