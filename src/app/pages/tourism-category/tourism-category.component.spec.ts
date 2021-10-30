import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TourismCategoryComponent } from './tourism-category.component';

describe('TourismCategoryComponent', () => {
  let component: TourismCategoryComponent;
  let fixture: ComponentFixture<TourismCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TourismCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourismCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
