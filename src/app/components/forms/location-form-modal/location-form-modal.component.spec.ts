import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationFormModalComponent } from './location-form-modal.component';

describe('LocationFormModalComponent', () => {
  let component: LocationFormModalComponent;
  let fixture: ComponentFixture<LocationFormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationFormModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
