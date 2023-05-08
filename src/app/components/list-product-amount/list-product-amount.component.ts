import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductSupplier, ProductSupplierOrder } from 'src/models/models';

@Component({
  selector: 'app-list-product-amount',
  templateUrl: './list-product-amount.component.html',
  styleUrls: ['./list-product-amount.component.scss']
})
export class ListProductAmountComponent implements OnInit {
  @Output() productsAmount$: EventEmitter<any> = new EventEmitter<any>();
  @Input() selectedProducts!:ProductSupplierOrder[];

  products!: ProductSupplierOrder[];
  
  ngOnInit(): void {
    this.products = this.selectedProducts as ProductSupplierOrder[];
  } 

  confirmAmounts(){
    this.productsAmount$.emit(this.products);
  }

  getProductosCompletos() : number {
    return this.products.filter(x => x.amountOrder !== null && x.amountOrder !== undefined && x.amountOrder !== 0).length;
  }
}
