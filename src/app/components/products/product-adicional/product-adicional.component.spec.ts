import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAdicionalComponent } from './product-adicional.component';

describe('ProductAdicionalComponent', () => {
  let component: ProductAdicionalComponent;
  let fixture: ComponentFixture<ProductAdicionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductAdicionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAdicionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
