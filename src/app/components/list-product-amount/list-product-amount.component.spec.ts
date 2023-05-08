import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductAmountComponent } from './list-product-amount.component';

describe('ListProductAmountComponent', () => {
  let component: ListProductAmountComponent;
  let fixture: ComponentFixture<ListProductAmountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListProductAmountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListProductAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
