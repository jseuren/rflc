import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomVideoComponent } from './video.component';

describe('RandomVideoComponent', () => {
  let component: RandomVideoComponent;
  let fixture: ComponentFixture<RandomVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RandomVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
