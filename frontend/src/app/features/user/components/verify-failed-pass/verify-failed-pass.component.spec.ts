import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyFailedPassComponent } from './verify-failed-pass.component';

describe('VerifyFailedPassComponent', () => {
  let component: VerifyFailedPassComponent;
  let fixture: ComponentFixture<VerifyFailedPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyFailedPassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyFailedPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
