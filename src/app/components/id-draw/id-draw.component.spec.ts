import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdDrawComponent } from './id-draw.component';

describe('IdDrawComponent', () => {
  let component: IdDrawComponent;
  let fixture: ComponentFixture<IdDrawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdDrawComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdDrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
