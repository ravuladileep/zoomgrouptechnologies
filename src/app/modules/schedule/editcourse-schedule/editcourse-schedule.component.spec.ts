import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcourseScheduleComponent } from './editcourse-schedule.component';

describe('EditcourseScheduleComponent', () => {
  let component: EditcourseScheduleComponent;
  let fixture: ComponentFixture<EditcourseScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditcourseScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditcourseScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
