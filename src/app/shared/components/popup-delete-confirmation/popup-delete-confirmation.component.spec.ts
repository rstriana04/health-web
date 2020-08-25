import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupDeleteConfirmationComponent } from './popup-delete-confirmation.component';

describe('PopupDeleteConfirmationComponent', () => {
  let component: PopupDeleteConfirmationComponent;
  let fixture: ComponentFixture<PopupDeleteConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupDeleteConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupDeleteConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
