import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawSvgComponent } from './draw-svg.component';

describe('DrawSvgComponent', () => {
  let component: DrawSvgComponent;
  let fixture: ComponentFixture<DrawSvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawSvgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
