import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogAsideOptionsComponent } from './blog-aside-options.component';

describe('BlogAsideOptionsComponent', () => {
  let component: BlogAsideOptionsComponent;
  let fixture: ComponentFixture<BlogAsideOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogAsideOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogAsideOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
