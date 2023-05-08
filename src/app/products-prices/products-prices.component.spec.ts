import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsPricesComponent } from './products-prices.component';

describe('ProductsPricesComponent', () => {
  let component: ProductsPricesComponent;
  let fixture: ComponentFixture<ProductsPricesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsPricesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsPricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
