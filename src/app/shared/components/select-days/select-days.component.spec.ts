import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectDaysComponent } from './select-days.component';

describe('SelectDaysComponent', () => {
  let component: SelectDaysComponent;
  let fixture: ComponentFixture<SelectDaysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectDaysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
