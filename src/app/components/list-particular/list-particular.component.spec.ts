import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListParticularComponent } from './list-particular.component';

describe('ListParticularComponent', () => {
  let component: ListParticularComponent;
  let fixture: ComponentFixture<ListParticularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListParticularComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListParticularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
