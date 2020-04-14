import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateIdcardComponent } from './generate-idcard.component';

describe('GenerateIdcardComponent', () => {
  let component: GenerateIdcardComponent;
  let fixture: ComponentFixture<GenerateIdcardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateIdcardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateIdcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
