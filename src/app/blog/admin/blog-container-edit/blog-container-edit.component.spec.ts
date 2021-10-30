import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogContainerEditComponent } from './blog-container-edit.component';

describe('BlogContainerEditComponent', () => {
  let component: BlogContainerEditComponent;
  let fixture: ComponentFixture<BlogContainerEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogContainerEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogContainerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
