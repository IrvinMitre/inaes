import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostGaleriaComponent } from './post-galeria.component';

describe('PostGaleriaComponent', () => {
  let component: PostGaleriaComponent;
  let fixture: ComponentFixture<PostGaleriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostGaleriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostGaleriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
