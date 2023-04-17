import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoProveedoresComponent } from './producto-proveedores.component';

describe('ProductoProveedoresComponent', () => {
  let component: ProductoProveedoresComponent;
  let fixture: ComponentFixture<ProductoProveedoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductoProveedoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductoProveedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
