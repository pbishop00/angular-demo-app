import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcHomeComponent } from './calc-home.component';

describe('CalcHomeComponent', () => {
  let component: CalcHomeComponent;
  let fixture: ComponentFixture<CalcHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalcHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalcHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
