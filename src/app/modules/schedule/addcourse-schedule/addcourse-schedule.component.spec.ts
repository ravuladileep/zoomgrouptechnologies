import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcourseScheduleComponent } from './addcourse-schedule.component';

describe('AddcourseScheduleComponent', () => {
  let component: AddcourseScheduleComponent;
  let fixture: ComponentFixture<AddcourseScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddcourseScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcourseScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
