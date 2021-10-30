import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEnterpriceComponent } from './new-enterprice.component';

describe('NewEnterpriceComponent', () => {
  let component: NewEnterpriceComponent;
  let fixture: ComponentFixture<NewEnterpriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewEnterpriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEnterpriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
