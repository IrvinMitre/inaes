import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostImagenDestacadaComponent } from './post-imagen-destacada.component';

describe('PostImagenDestacadaComponent', () => {
  let component: PostImagenDestacadaComponent;
  let fixture: ComponentFixture<PostImagenDestacadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostImagenDestacadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostImagenDestacadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
