import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductKeywordComponent } from './product-keyword.component';

describe('ProductKeywordComponent', () => {
  let component: ProductKeywordComponent;
  let fixture: ComponentFixture<ProductKeywordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductKeywordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductKeywordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
