import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersDisplayedComponent } from './users-displayed.component';

describe('UsersDisplayedComponent', () => {
  let component: UsersDisplayedComponent;
  let fixture: ComponentFixture<UsersDisplayedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersDisplayedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersDisplayedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
