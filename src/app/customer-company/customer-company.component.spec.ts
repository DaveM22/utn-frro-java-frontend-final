import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCompanyComponent } from './customer-company.component';

describe('CustomerCompanyComponent', () => {
  let component: CustomerCompanyComponent;
  let fixture: ComponentFixture<CustomerCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerCompanyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
