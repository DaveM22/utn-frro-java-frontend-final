import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticularComponent } from './particular.component';

describe('CustomerComponent', () => {
  let component: ParticularComponent;
  let fixture: ComponentFixture<ParticularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticularComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParticularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
