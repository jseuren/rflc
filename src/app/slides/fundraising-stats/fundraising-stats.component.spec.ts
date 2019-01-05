import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundraisingStatsComponent } from './fundraising-stats.component';

describe('FundraisingStatsComponent', () => {
  let component: FundraisingStatsComponent;
  let fixture: ComponentFixture<FundraisingStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundraisingStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundraisingStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
