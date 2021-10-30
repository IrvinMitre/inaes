import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductEntregaComponent } from './product-entrega.component';

describe('ProductEntregaComponent', () => {
  let component: ProductEntregaComponent;
  let fixture: ComponentFixture<ProductEntregaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductEntregaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductEntregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
