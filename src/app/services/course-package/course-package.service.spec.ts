import { TestBed } from '@angular/core/testing';

import { CoursePackageService } from './course-package.service';

describe('CoursePackageService', () => {
  let service: CoursePackageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoursePackageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
