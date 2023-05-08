import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSupplierFormComponent } from './product-supplier-form.component';

describe('ProductSupplierFormComponent', () => {
  let component: ProductSupplierFormComponent;
  let fixture: ComponentFixture<ProductSupplierFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductSupplierFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductSupplierFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
