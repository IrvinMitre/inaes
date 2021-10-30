import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoApprovedComponent } from './no-approved.component';

describe('NoApprovedComponent', () => {
  let component: NoApprovedComponent;
  let fixture: ComponentFixture<NoApprovedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoApprovedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
