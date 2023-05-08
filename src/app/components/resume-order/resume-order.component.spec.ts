import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeOrderComponent } from './resume-order.component';

describe('ResumeOrderComponent', () => {
  let component: ResumeOrderComponent;
  let fixture: ComponentFixture<ResumeOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumeOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
