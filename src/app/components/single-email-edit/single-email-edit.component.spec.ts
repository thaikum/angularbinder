import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleEmailEditComponent } from './single-email-edit.component';

describe('SingleEmailEditComponent', () => {
  let component: SingleEmailEditComponent;
  let fixture: ComponentFixture<SingleEmailEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleEmailEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleEmailEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
