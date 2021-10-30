import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsAndServicesComponent } from './goods-and-services.component';

describe('GoodsAndServicesComponent', () => {
  let component: GoodsAndServicesComponent;
  let fixture: ComponentFixture<GoodsAndServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodsAndServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsAndServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
