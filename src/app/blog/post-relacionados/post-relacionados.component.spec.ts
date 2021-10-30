import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostRelacionadosComponent } from './post-relacionados.component';

describe('PostRelacionadosComponent', () => {
  let component: PostRelacionadosComponent;
  let fixture: ComponentFixture<PostRelacionadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostRelacionadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostRelacionadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
