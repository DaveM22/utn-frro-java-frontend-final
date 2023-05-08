import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPricesComponent } from './list-prices.component';

describe('ListPricesComponent', () => {
  let component: ListPricesComponent;
  let fixture: ComponentFixture<ListPricesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPricesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
